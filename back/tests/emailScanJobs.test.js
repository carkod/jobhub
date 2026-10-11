import test from "node:test";
import assert from "node:assert/strict";
import {
  getEmailScan,
  startEmailScan,
  toPublicJob,
} from "../src/services/emailScanJobs.js";

const result = { processed: [{ status: "created" }, { status: "error" }], reviewQueue: [] };

test("starts one scan for each mailbox and reports the result", async () => {
  let finish;
  const first = startEmailScan("a@example.com", () => new Promise((r) => (finish = r)));
  const second = startEmailScan("a@example.com", async () => result);

  assert.equal(first.alreadyRunning, false);
  assert.equal(second.alreadyRunning, true);
  assert.equal(second.job.id, first.job.id);
  assert.equal(toPublicJob(first.job).state, "running");

  finish(result);
  await new Promise((r) => setImmediate(r));

  const done = toPublicJob(getEmailScan(first.job.id));
  assert.equal(done.state, "completed");
  assert.deepEqual(done.summary.counts, { created: 1, error: 1 });
});

test("a failed scan keeps the error and frees the mailbox", async () => {
  const { job } = startEmailScan("b@example.com", async () => {
    throw Object.assign(new Error("boom"), { code: "X", status: 500 });
  });
  await new Promise((r) => setImmediate(r));

  assert.equal(toPublicJob(job).state, "failed");
  assert.equal(toPublicJob(job).error.message, "boom");
  assert.equal(startEmailScan("b@example.com", async () => result).alreadyRunning, false);
});
