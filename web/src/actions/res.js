import { buildBackUrl, handleResponse } from "./actions.config";

export function fetchPortfolioNav() {
  return fetch(`${buildBackUrl().apiUrl}/portfolio/navigation`).then(
    handleResponse,
  );
}
