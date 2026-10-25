import { buildBackUrl, handleResponse, headers } from "./actions.config";

export function fetchCVNav() {
  return fetch(`${buildBackUrl().apiUrl}/cvs/navigation`, { headers }).then(
    handleResponse,
  );
}
