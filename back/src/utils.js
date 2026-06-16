import path from "path";
import sanitize from "mongo-sanitize";

export function handleResponse(response, res) {
  if (response.ok) {
    return response.json();
  } else {
    throw new Error(`Response status: ${response.status}`);
  }
}

export function escapeRegex(string) {
  return string.replace(/[/\-\\^$*+?.()|[\]{}]/g, "\\$&");
}

export function cleanQueryString(value, maxLength = 100) {
  const firstValue = Array.isArray(value) ? value[0] : value;
  if (typeof firstValue !== "string") return "";

  const sanitized = sanitize(firstValue);
  if (typeof sanitized !== "string") return "";

  return sanitized.trim().slice(0, maxLength);
}

export function cleanObjectIdString(value) {
  const cleanValue = cleanQueryString(value, 24);
  return /^[0-9a-fA-F]{24}$/.test(cleanValue) ? cleanValue : null;
}

export function getPositiveInteger(value, fallback, max) {
  const parsed = Number.parseInt(Array.isArray(value) ? value[0] : value, 10);
  if (!Number.isSafeInteger(parsed) || parsed < 1) return fallback;

  return Math.min(parsed, max);
}

export function safeFileBasename(fileName) {
  if (typeof fileName !== "string") return null;

  const baseName = path.basename(fileName).replace(/\0/g, "").trim();
  if (!baseName || baseName === "." || baseName === "..") return null;

  return baseName;
}

export function safeFileBasenameFromUrl(fileUrl) {
  if (typeof fileUrl !== "string") return null;

  try {
    return safeFileBasename(decodeURIComponent(new URL(fileUrl).pathname));
  } catch (e) {
    return safeFileBasename(fileUrl);
  }
}

export function safeResolveInside(baseDir, fileName) {
  const baseName = safeFileBasename(fileName);
  if (!baseName) return null;

  const resolvedBase = path.resolve(baseDir);
  const resolvedPath = path.resolve(resolvedBase, baseName);

  if (!resolvedPath.startsWith(`${resolvedBase}${path.sep}`)) return null;

  return resolvedPath;
}

export function uploadFileName(originalName) {
  return safeFileBasename(originalName) || `upload-${Date.now()}`;
}

export function uploadFileNameFromDocument(doc = {}) {
  return (
    safeFileBasenameFromUrl(doc.fileURL) ||
    safeFileBasenameFromUrl(doc.url) ||
    safeFileBasename(doc.fileRawName) ||
    safeFileBasename(doc.fileName)
  );
}

export function delay(ms = 5000) {
  return new Promise((res) => setTimeout(res, ms));
}

export const typedStatus = ["in progress", "applied", "success", "rejected"];

export function validateUrl(url) {
  if (!url) return false;
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return url.match(urlRegex);
}

export async function apiRequest(url, verb, data, headers) {
  if (!headers) {
    headers = headers;
  }

  let options = {
    method: verb,
    body: data,
    headers: headers,
  };

  const request = new Request(url, options);
  console.log("request ", request);
  const response = await fetch(request);
  const content = await handleResponse(response);
  return content;
}
