/**
 * Javascript generic errors
 */
export function checkValue(value) {
  if (value !== undefined && value !== null && value !== "") {
    return true;
  }
  return false;
}
