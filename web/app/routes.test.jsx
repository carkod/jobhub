import { render, screen } from "@testing-library/react";
import HomePage, { metadata as homeMetadata } from "./page";
import AboutPage, { metadata as aboutMetadata } from "./about/page";
import AboutMePage, { metadata as meMetadata } from "./about/me/page";
import AboutSitePage, { metadata as siteMetadata } from "./about/site/page";
import BlogIndexPage, { metadata as blogIndexMetadata } from "./blog/page";
import BlogDetailPage, {
  generateMetadata as blogMetadata,
} from "./blog/[id]/page";
import CVPage, {
  generateMetadata as cvMetadata,
} from "./cv/[language]/[id]/page";
import ProjectDetailPage from "./portfolio/[language]/[position]/page";
import ResourcesPage from "./resources/[language]/[id]/page";
import NotFound, { metadata as notFoundMetadata } from "./not-found";
import {
  getPublicCVNavigation,
  getPublicCV,
  getPublicBlogs,
  getPublicBlog,
  getPublicProjects,
} from "./_lib/public-api";

jest.mock("./_lib/public-api", () => ({
  getPublicCVNavigation: jest.fn(),
  getPublicCV: jest.fn(),
  getPublicBlogs: jest.fn(),
  getPublicBlog: jest.fn(),
  getPublicProjects: jest.fn(),
  projectsForCategory: (projects, language, position) =>
    projects.filter(
      (project) =>
        project.cats.locale === language && project.cats.position === position,
    ),
  excerpt: (value) => value,
}));

jest.mock("../src/views/home/Home", () => ({
  __esModule: true,
  default: ({ cvs }) => <div data-testid="home-view">{cvs[0]?.name}</div>,
}));
jest.mock("../src/views/About", () => ({
  About: () => <div data-testid="about-view" />,
  AboutMe: () => <div data-testid="about-me-view" />,
  AboutSite: () => <div data-testid="about-site-view" />,
}));
jest.mock("../src/views/blog/BlogIndex", () => ({
  __esModule: true,
  default: ({ blogs }) => (
    <div data-testid="blog-index-view">{blogs[0]?.name}</div>
  ),
}));
jest.mock("../src/views/blog/BlogDetail", () => ({
  __esModule: true,
  default: ({ blog }) => <div data-testid="blog-detail-view">{blog.name}</div>,
}));
jest.mock("../src/views/cv/MainCV", () => ({
  __esModule: true,
  default: ({ initialCv }) => <div data-testid="cv-view">{initialCv.name}</div>,
}));
jest.mock("../src/views/portfolio/ProjectDetail", () => ({
  __esModule: true,
  default: ({ initialProjects }) => (
    <div data-testid="project-detail-view">{initialProjects[0]?.name}</div>
  ),
}));
jest.mock("../src/views/resources/MainResources", () => ({
  __esModule: true,
  default: ({ initialProjects }) => (
    <div data-testid="resources-view">{initialProjects[0]?.name}</div>
  ),
}));
jest.mock("../src/views/FourOFour", () => ({
  __esModule: true,
  default: () => <div data-testid="not-found-view" />,
}));

const params = (value) => ({ params: Promise.resolve(value) });

beforeEach(() => {
  getPublicCVNavigation.mockResolvedValue([{ name: "Platform CV" }]);
  getPublicCV.mockResolvedValue({
    name: "Platform CV",
    summary: "Summary",
    cats: { locale: "en-GB" },
  });
  getPublicBlogs.mockResolvedValue([{ name: "First post" }]);
  getPublicBlog.mockResolvedValue({ name: "First post", content: "Post body" });
  getPublicProjects.mockResolvedValue([
    { name: "Project one", cats: { locale: "en-GB", position: "Engineering" } },
  ]);
});

describe("App Router pages", () => {
  it("renders the home and blog indexes with public server data", async () => {
    render(await HomePage());
    expect(screen.getByTestId("home-view")).toHaveTextContent("Platform CV");
    expect(homeMetadata.description).toBeTruthy();

    render(await BlogIndexPage());
    expect(screen.getByTestId("blog-index-view")).toHaveTextContent(
      "First post",
    );
    expect(blogIndexMetadata.description).toBeTruthy();
  });

  it("renders the about routes with route metadata", () => {
    render(<AboutPage />);
    render(<AboutMePage />);
    render(<AboutSitePage />);
    expect(screen.getByTestId("about-view")).toBeInTheDocument();
    expect(screen.getByTestId("about-me-view")).toBeInTheDocument();
    expect(screen.getByTestId("about-site-view")).toBeInTheDocument();
    expect(
      [aboutMetadata, meMetadata, siteMetadata].every(
        (item) => item.description,
      ),
    ).toBe(true);
  });

  it("renders published detail data and its server metadata", async () => {
    render(await BlogDetailPage(params({ id: "first-post" })));
    render(
      await CVPage(params({ language: "en-GB", id: "platform-engineer" })),
    );
    render(
      await ProjectDetailPage(
        params({ language: "en-GB", position: "Engineering" }),
      ),
    );
    render(
      await ResourcesPage(params({ language: "en-GB", id: "Engineering" })),
    );

    expect(screen.getByTestId("blog-detail-view")).toHaveTextContent(
      "First post",
    );
    expect(screen.getByTestId("cv-view")).toHaveTextContent("Platform CV");
    expect(screen.getByTestId("project-detail-view")).toHaveTextContent(
      "Project one",
    );
    expect(screen.getByTestId("resources-view")).toHaveTextContent(
      "Project one",
    );
    expect((await blogMetadata(params({ id: "first-post" }))).title).toBe(
      "First post",
    );
    expect(
      (await cvMetadata(params({ language: "en-GB", id: "platform-engineer" })))
        .title,
    ).toBe("Platform CV");
  });

  it("marks the not-found page as noindex", () => {
    render(<NotFound />);
    expect(screen.getByTestId("not-found-view")).toBeInTheDocument();
    expect(notFoundMetadata.robots.index).toBe(false);
  });
});
