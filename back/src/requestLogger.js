import crypto from "crypto";

const LOG_LEVEL_VALUES = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
  silent: Number.POSITIVE_INFINITY,
};

const getConfiguredLogLevel = () => {
  const configuredLevel = (process.env.LOG_LEVEL || "error").toLowerCase();
  return Object.hasOwn(LOG_LEVEL_VALUES, configuredLevel)
    ? configuredLevel
    : "error";
};

const shouldLog = (level) =>
  LOG_LEVEL_VALUES[level] >= LOG_LEVEL_VALUES[getConfiguredLogLevel()];

const writeLog = (level, details) => {
  if (!shouldLog(level)) return;

  const entry = JSON.stringify({
    timestamp: new Date().toISOString(),
    level,
    ...details,
  });

  if (level === "error") {
    console.error(entry);
  } else if (level === "warn") {
    console.warn(entry);
  } else {
    console.info(entry);
  }
};

const requestLogLevel = (statusCode, aborted) => {
  if (statusCode >= 500) return "error";
  if (aborted || statusCode >= 400) return "warn";
  return "info";
};

const isLocalHealthCheck = (req) => {
  if (process.env.LOG_HEALTH_CHECKS === "true") return false;

  const remoteAddress = req.socket?.remoteAddress;
  return (
    req.method === "GET" &&
    req.path === "/api" &&
    ["127.0.0.1", "::1", "::ffff:127.0.0.1"].includes(remoteAddress)
  );
};

export default function requestLogger(req, res, next) {
  if (isLocalHealthCheck(req)) return next();

  const startedAt = process.hrtime.bigint();
  const requestId = crypto.randomUUID();
  let logged = false;

  res.setHeader("X-Request-Id", requestId);

  const logRequest = (aborted = false) => {
    if (logged) return;
    logged = true;

    const durationMs = Number(process.hrtime.bigint() - startedAt) / 1e6;
    const statusCode = res.statusCode || 500;

    writeLog(requestLogLevel(statusCode, aborted), {
      event: "http_request",
      requestId,
      method: req.method,
      path: req.path,
      statusCode,
      durationMs: Number(durationMs.toFixed(1)),
      ...(aborted ? { aborted: true } : {}),
    });
  };

  res.once("finish", () => logRequest());
  res.once("close", () => {
    if (!res.writableEnded) logRequest(true);
  });

  return next();
}
