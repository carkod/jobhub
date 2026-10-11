import crypto from "crypto";
import { logger } from "../requestLogger.js";

// Jobs live in memory. A server restart loses them, and a lost job returns 404.
const JOB_TTL_MS = 60 * 60 * 1000;
const jobs = new Map();
const activeByMailbox = new Map();

const pruneJobs = () => {
  const cutoff = Date.now() - JOB_TTL_MS;
  for (const [id, job] of jobs) {
    if (job.finishedAt && job.finishedAt < cutoff) jobs.delete(id);
  }
};

const summarize = (result) => {
  const counts = {};
  for (const item of result.processed) {
    counts[item.status] = (counts[item.status] || 0) + 1;
  }
  return {
    total: result.processed.length,
    counts,
    review: result.reviewQueue.length,
  };
};

// Starts run() in the background. Only one scan runs for each mailbox.
export function startEmailScan(mailbox, run) {
  pruneJobs();

  const activeId = activeByMailbox.get(mailbox);
  if (activeId) return { job: jobs.get(activeId), alreadyRunning: true };

  const job = {
    id: crypto.randomUUID(),
    state: "running",
    startedAt: Date.now(),
  };
  jobs.set(job.id, job);
  activeByMailbox.set(mailbox, job.id);

  run()
    .then((result) => {
      job.state = "completed";
      job.summary = summarize(result);
    })
    .catch((error) => {
      job.state = "failed";
      job.error = {
        code: error.code,
        status: error.status,
        message: error.message,
      };
      logger.error({
        event: "email_scan_failed",
        scanId: job.id,
        code: error.code,
        status: error.status,
        message: error.message,
        stack: error.stack,
      });
    })
    .finally(() => {
      job.finishedAt = Date.now();
      activeByMailbox.delete(mailbox);
    });

  return { job, alreadyRunning: false };
}

export const getEmailScan = (id) => jobs.get(id);

export const toPublicJob = (job) => ({
  scanId: job.id,
  state: job.state,
  startedAt: job.startedAt,
  finishedAt: job.finishedAt,
  summary: job.summary,
  error: job.error,
});
