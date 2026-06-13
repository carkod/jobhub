export const headers = {
  "Content-Type": "application/json",
};

export const bufferHeaders = {
  Accept: "application/pdf",
};

export const formdataHeaders = {};

export function handleResponse(response) {
  if (response.ok) {
    return response.json();
  } else {
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

export function handleUploadResponse(response) {
  if (response.ok) {
    return response.json();
  } else {
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

export function handlePdfResponse(response) {
  if (response.ok) {
    return response;
  } else {
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

/**
 * Returns base URL paths for API and PDF endpoints.
 * Browser requests stay same-origin and are proxied by Next.js by default.
 * NEXT_PUBLIC_API_BASE remains available for deployments with a public API
 * origin, such as https://api.carlos.wf.
 */
export function buildBackUrl() {
  const base = (process.env.NEXT_PUBLIC_API_BASE ?? "").replace(/\/$/, "");
  return {
    apiUrl: `${base}/api`,
    pdfUrl: `${base}/pdf`,
  };
}
