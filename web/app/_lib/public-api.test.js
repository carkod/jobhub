import {
  excerpt,
  getPublicBlog,
  getPublicBlogs,
  getPublicCV,
  getPublicProjects,
  projectsForCategory,
} from "./public-api";

beforeEach(() => {
  global.fetch = jest.fn(async (url) => {
    let data;
    if (url.endsWith("/api/blogs")) {
      data = [
        { name: "Published", status: "public" },
        { name: "Draft", status: "draft" },
      ];
    } else if (url.endsWith("/api/blog/published")) {
      data = {
        data: {
          name: "Published",
          status: "public",
          content: "Text",
          privateNote: "secret",
        },
      };
    } else if (url.endsWith("/api/cvs/public-cv")) {
      data = {
        cv: {
          name: "CV",
          cats: { status: "public", locale: "en-GB" },
          summary: "Hi",
          privateNote: "secret",
        },
      };
    } else if (url.endsWith("/api/portfolio")) {
      data = [
        {
          name: "Visible",
          cats: { status: "public", locale: "en-GB", position: "Engineering" },
          privateNote: "secret",
        },
        {
          name: "Hidden",
          cats: { status: "draft", locale: "en-GB", position: "Engineering" },
        },
      ];
    }
    return { ok: true, json: async () => data };
  });
});

test("server loaders keep draft and internal fields out of rendered data", async () => {
  expect((await getPublicBlogs()).map((blog) => blog.name)).toEqual([
    "Published",
  ]);
  expect(await getPublicBlog("published")).toMatchObject({ name: "Published" });
  expect(await getPublicBlog("published")).not.toHaveProperty("privateNote");
  expect(await getPublicCV("public-cv")).not.toHaveProperty("privateNote");

  const projects = await getPublicProjects();
  expect(projectsForCategory(projects, "en-GB", "engineering")).toHaveLength(1);
  expect(projects[0]).not.toHaveProperty("privateNote");
  expect(global.fetch).toHaveBeenCalledWith(
    expect.stringContaining("/api/portfolio"),
    { cache: "no-store" },
  );
});

test("metadata excerpt works on the server", () => {
  expect(excerpt("<p>Hello <strong>world</strong></p>")).toBe("Hello world");
});
