import test from "node:test";
import assert from "node:assert/strict";
import EmailParser from "../src/services/emailParser.js";

const makeParser = (messages, classifyEmail, extractJobData = async () => null) => {
  const parser = new EmailParser("test-token");
  const cache = new Map();
  let fetchCount = 0;

  parser.mailbox = "tester@example.com";
  parser.gmailApi = {
    fetchIndividualEmail: async (messageId) => {
      fetchCount += 1;
      return messages[messageId];
    },
  };
  parser.geminiApi = {
    getEmailModelName: () => "gemini-3.1-flash-lite",
    classifyEmail,
    extractJobData,
  };
  parser.EmailScanCacheModel = {
    findOne: ({ messageId }) => ({ lean: async () => cache.get(messageId) || null }),
    replaceOne: async ({ messageId }, replacement) => {
      cache.set(messageId, { ...replacement });
    },
    updateOne: async ({ messageId }, update) => {
      Object.assign(cache.get(messageId), update.$set);
    },
  };

  return { parser, cache, getFetchCount: () => fetchCount };
};

const message = (subject, snippet) => ({
  threadId: "thread-1",
  snippet,
  payload: {
    headers: [{ name: "Subject", value: subject }],
    mimeType: "text/plain",
    body: { data: Buffer.from(snippet).toString("base64url") },
  },
});

test("classifies unrelated mail broadly and reuses its verdict", async () => {
  let classificationCalls = 0;
  let extractionCalls = 0;
  const messages = {
    beta: message("KuCard beta program", "Apply to test our new card"),
    billing: message("Your bank statement", "Your monthly statement is ready"),
  };
  const { parser, getFetchCount } = makeParser(
    messages,
    async () => {
      classificationCalls += 1;
      return { is_job_related: false, confidence: 0.98, reason: "Not hiring" };
    },
    async () => {
      extractionCalls += 1;
    },
  );

  assert.equal((await parser.parseMessage("beta")).status, "skipped_classification");
  assert.equal((await parser.parseMessage("billing")).status, "skipped_classification");
  assert.equal((await parser.parseMessage("beta")).cached, true);
  assert.equal(classificationCalls, 2);
  assert.equal(extractionCalls, 0);
  assert.equal(getFetchCount(), 2);
});

test("extracts accepted job mail once and caches the processed result", async () => {
  let classificationCalls = 0;
  let extractionCalls = 0;
  let writes = 0;
  const { parser } = makeParser(
    { job: message("Interview for analyst role", "Please choose an interview time") },
    async () => {
      classificationCalls += 1;
      return { is_job_related: true, confidence: 0.96, reason: "Interview" };
    },
    async () => {
      extractionCalls += 1;
      return { company: "Acme", job_title: "Analyst", confidence: 0.95 };
    },
  );
  parser.matchApplication = async () => ({ application: { _id: "id" }, confidence: 1 });
  parser.guardedUpsert = async () => {
    writes += 1;
    return { status: "updated" };
  };

  assert.equal((await parser.parseMessage("job")).status, "updated");
  assert.equal((await parser.parseMessage("job")).cached, true);
  assert.equal(classificationCalls, 1);
  assert.equal(extractionCalls, 1);
  assert.equal(writes, 1);
});

test("maps extracted status to the tracker status object", async () => {
  const parser = new EmailParser("test-token");
  let saved;
  parser.ApplicationModel = {
    updateOne: async (_query, payload) => {
      saved = payload;
    },
  };

  await parser.guardedUpsert({
    extraction: {
      company: "Acme",
      job_title: "Analyst",
      status: "In Progress",
      confidence: 0.95,
    },
    date: "2026-10-04T00:00:00.000Z",
    emailId: "job",
    threadId: "thread-1",
    match: { application: { _id: "id", company: "Acme" }, confidence: 1 },
  });

  assert.deepEqual(saved.status, { text: "in progress", value: 1 });
  assert.equal(saved.company, "Acme");
  assert.equal(saved.role, "Analyst");
  assert.equal(Object.hasOwn(saved, "contacts"), false);
});

test("POST scan creates a confident application when no record matches", async () => {
  const parser = new EmailParser("test-token");
  let created;
  parser.ApplicationModel = {
    create: async (payload) => {
      created = payload;
    },
  };

  const result = await parser.guardedUpsert({
    extraction: { company: "Acme", job_title: "Analyst", confidence: 0.95 },
    emailId: "job",
    threadId: "thread-1",
    match: { application: null, confidence: 0 },
  });

  assert.equal(result.status, "created");
  assert.equal(created.company, "Acme");
  assert.equal(created.role, "Analyst");
});

test("PUT scan sends unmatched applications to review without creating them", async () => {
  const parser = new EmailParser("test-token");
  parser.ApplicationModel = {
    create: async () => {
      assert.fail("PUT scan must not create an application");
    },
  };

  const result = await parser.guardedUpsert({
    extraction: { company: "Acme", job_title: "Analyst", confidence: 0.95 },
    emailId: "job",
    threadId: "thread-1",
    match: { application: null, confidence: 0 },
    updateOnly: true,
  });

  assert.equal(result.status, "review");
  assert.equal(parser.reviewQueue.length, 1);
});

test("an older email cannot replace a newer application update", async () => {
  const parser = new EmailParser("test-token");
  parser.ApplicationModel = {
    updateOne: async () => {
      assert.fail("An older email must not update the application");
    },
  };

  const result = await parser.guardedUpsert({
    extraction: { status: "rejected", confidence: 0.95 },
    date: "2026-10-03T00:00:00.000Z",
    emailId: "older-job",
    threadId: "thread-1",
    match: {
      application: {
        _id: "id",
        company: "Acme",
        status: { text: "in progress" },
        lastEmailAt: new Date("2026-10-04T00:00:00.000Z"),
      },
      confidence: 1,
    },
    updateOnly: true,
  });

  assert.equal(result.status, "skipped_older_email");
});

test("PUT scan updates a match even when the email was processed before", async () => {
  let updates = 0;
  const { parser } = makeParser(
    { job: message("Interview for analyst role", "Please choose a time") },
    async () => ({ is_job_related: true, confidence: 0.96 }),
    async () => ({ company: "Acme", job_title: "Analyst", confidence: 0.95 }),
  );
  parser.matchApplication = async () => ({
    application: { _id: "id", company: "Acme" },
    confidence: 1,
  });
  parser.ApplicationModel = {
    updateOne: async () => {
      updates += 1;
    },
  };

  assert.equal((await parser.parseMessage("job")).status, "updated");
  assert.equal((await parser.parseMessage("job", { updateOnly: true })).status, "updated");
  assert.equal(updates, 2);
});
