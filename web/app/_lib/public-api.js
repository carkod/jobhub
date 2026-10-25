const apiOrigin =
  process.env.API_SERVER_URL ??
  (process.env.NODE_ENV === "development"
    ? "http://localhost:8082"
    : "http://back:8082");

async function get(path) {
  try {
    const response = await fetch(`${apiOrigin.replace(/\/$/, "")}/api${path}`, {
      cache: "no-store",
    });
    return response.ok ? await response.json() : null;
  } catch {
    return null;
  }
}

export async function getPublicCVNavigation() {
  const cvs = await get("/cvs/navigation");
  return Array.isArray(cvs)
    ? cvs.filter((cv) => cv.cats?.status === "public")
    : [];
}

export async function getPublicCV(id) {
  const result = await get(`/cvs/${encodeURIComponent(id)}`);
  const cv = result?.cv;
  if (cv?.cats?.status !== "public") return null;
  const {
    _id,
    name,
    slug,
    summary,
    cats,
    persdetails,
    workExp,
    educ,
    langSkills,
    webdevSkills,
    itSkills,
  } = cv;
  return {
    _id,
    name,
    slug,
    summary,
    cats,
    persdetails,
    workExp,
    educ,
    langSkills,
    webdevSkills,
    itSkills,
  };
}

export async function getPublicBlogs() {
  const blogs = await get("/blogs");
  return Array.isArray(blogs)
    ? blogs.filter((blog) => blog.status === "public")
    : [];
}

export async function getPublicBlog(id) {
  const result = await get(`/blog/${encodeURIComponent(id)}`);
  const blog = result?.data;
  if (blog?.status !== "public") return null;
  const {
    _id,
    name,
    slug,
    category,
    tags,
    content,
    status,
    createdAt,
    updatedAt,
  } = blog;
  return {
    _id,
    name,
    slug,
    category,
    tags,
    content,
    status,
    createdAt,
    updatedAt,
  };
}

export async function getPublicProjects() {
  const projects = await get("/portfolio");
  return Array.isArray(projects)
    ? projects
        .filter((project) => project.cats?.status === "public")
        .map((project) => {
          const { _id, name, slug, cats, desc, documents, links } = project;
          return { _id, name, slug, cats, desc, documents, links };
        })
    : [];
}

export function projectsForCategory(projects, language, position) {
  return projects.filter(
    (project) =>
      project.cats?.locale === language &&
      project.cats?.position?.toLowerCase() === position.toLowerCase(),
  );
}

export function excerpt(value = "", limit = 160) {
  const plain = String(value)
    .replace(/<[^>]*>/g, " ")
    .replace(/[#*`_]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return plain.length > limit ? `${plain.slice(0, limit).trimEnd()}…` : plain;
}
