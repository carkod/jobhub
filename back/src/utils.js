import path from "path";

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
