import {
  bufferHeaders,
  buildBackUrl,
  handlePdfResponse,
} from "./actions.config";

export async function generatePdfApi(type, id, locale = "en-GB") {
  const response = await fetch(
    `${buildBackUrl().pdfUrl}/generate/${type}/${encodeURIComponent(id)}/${encodeURIComponent(locale)}`,
    { method: "GET", headers: bufferHeaders },
  );
  await handlePdfResponse(response);
  return response.arrayBuffer();
}
