import { buildBackUrl, handleResponse, headers } from "../utils";

export const generateAiCv = (payload) => () =>
  fetch(`${buildBackUrl().apiUrl}/ai-cv`, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  }).then(handleResponse);

export const fetchAiCvGeneration = (id) => () =>
  fetch(`${buildBackUrl().apiUrl}/ai-cv/${id}`, { headers }).then(
    handleResponse,
  );
