/**
 * Javascript generic errors
 */
export function checkValue(value) {
  if (value !== undefined && value !== null && value !== "") {
    return true;
  }
  return false;
}

const EXCERPT_MAX_LENGTH = 10

export function createExcerpt(html) {
   let tmp = document.createElement("DIV");
   tmp.innerHTML = html;
   const blogPost = tmp.textContent || tmp.innerText || "";
   let excerpt = "";
   if (blogPost.length > EXCERPT_MAX_LENGTH) {
    excerpt = blogPost.substring(0, EXCERPT_MAX_LENGTH);
    excerpt = excerpt.substring(0, excerpt.lastIndexOf(' '));
    excerpt += '...';
  }
  return excerpt;
}
