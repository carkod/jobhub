import { render, screen } from "@testing-library/react";
import HomePage from "./page";
import AboutPage from "./about/page";
import AboutMePage from "./about/me/page";
import AboutSitePage from "./about/site/page";
import BlogIndexPage from "./blog/page";
import BlogDetailPage from "./blog/[id]/page";
import CVPage from "./cv/[language]/[id]/page";
import ProjectDetailPage from "./portfolio/[language]/[position]/page";
import ResourcesPage from "./resources/[language]/[id]/page";
import NotFound from "./not-found";

jest.mock("../src/components/Metatags", () => ({
  __esModule: true,
  default: ({ title, description, robots }) => (
    <div
      data-testid="metatags"
      data-title={title}
      data-description={description}
      data-robots={robots}
    />
  ),
}));

jest.mock("../src/views/home/Home", () => ({
  __esModule: true,
  default: () => <div data-testid="home-view" />,
}));

jest.mock("../src/views/About", () => ({
  About: () => <div data-testid="about-view" />,
  AboutMe: () => <div data-testid="about-me-view" />,
  AboutSite: () => <div data-testid="about-site-view" />,
}));

jest.mock("../src/views/blog/BlogIndex", () => ({
  __esModule: true,
  default: () => <div data-testid="blog-index-view" />,
}));

jest.mock("../src/views/blog/BlogDetail", () => ({
  __esModule: true,
  default: ({ match }) => (
    <div data-testid="blog-detail-view">{JSON.stringify(match.params)}</div>
  ),
}));

jest.mock("../src/views/cv/MainCV", () => ({
  __esModule: true,
  default: ({ match }) => (
    <div data-testid="cv-view">{JSON.stringify(match.params)}</div>
  ),
}));

jest.mock("../src/views/portfolio/ProjectDetail", () => ({
  __esModule: true,
  default: ({ match }) => (
    <div data-testid="project-detail-view">{JSON.stringify(match.params)}</div>
  ),
}));

jest.mock("../src/views/resources/MainResources", () => ({
  __esModule: true,
  default: ({ match }) => (
    <div data-testid="resources-view">{JSON.stringify(match.params)}</div>
  ),
}));

jest.mock("../src/views/FourOFour", () => ({
  __esModule: true,
  default: () => <div data-testid="not-found-view" />,
}));

describe("app route wrappers", () => {
  it("renders the home view from the root route", () => {
    render(<HomePage />);

    expect(screen.getByTestId("home-view")).toBeInTheDocument();
  });

  it("renders the about index and nested about routes", () => {
    const { rerender } = render(<AboutPage />);
    expect(screen.getByTestId("about-view")).toBeInTheDocument();

    rerender(<AboutMePage />);
    expect(screen.getByTestId("about-me-view")).toBeInTheDocument();
    expect(screen.getByTestId("metatags")).toHaveAttribute(
      "data-title",
      "About Me",
    );

    rerender(<AboutSitePage />);
    expect(screen.getByTestId("about-site-view")).toBeInTheDocument();
    expect(screen.getByTestId("metatags")).toHaveAttribute(
      "data-title",
      "About This Site",
    );
  });

  it("renders the blog index view", () => {
    render(<BlogIndexPage />);

    expect(screen.getByTestId("blog-index-view")).toBeInTheDocument();
  });

  it("passes blog route params to the detail view match prop", async () => {
    render(
      await BlogDetailPage({ params: Promise.resolve({ id: "post-one" }) }),
    );

    expect(screen.getByTestId("blog-detail-view")).toHaveTextContent(
      JSON.stringify({ id: "post-one" }),
    );
  });

  it("passes CV route params to the CV view match prop", async () => {
    render(
      await CVPage({
        params: Promise.resolve({ language: "en-GB", id: "platform-engineer" }),
      }),
    );

    expect(screen.getByTestId("cv-view")).toHaveTextContent(
      JSON.stringify({ language: "en-GB", id: "platform-engineer" }),
    );
  });

  it("passes portfolio route params to the project detail view match prop", async () => {
    render(
      await ProjectDetailPage({
        params: Promise.resolve({
          language: "en-GB",
          position: "Engineering",
        }),
      }),
    );

    expect(screen.getByTestId("project-detail-view")).toHaveTextContent(
      JSON.stringify({ language: "en-GB", position: "Engineering" }),
    );
  });

  it("maps resources route id into id and legacy position params", async () => {
    render(
      await ResourcesPage({
        params: Promise.resolve({ language: "en-GB", id: "tooling" }),
      }),
    );

    expect(screen.getByTestId("resources-view")).toHaveTextContent(
      JSON.stringify({ language: "en-GB", id: "tooling", position: "tooling" }),
    );
  });

  it("renders the not-found route with noindex metadata", () => {
    render(<NotFound />);

    expect(screen.getByTestId("not-found-view")).toBeInTheDocument();
    expect(screen.getByTestId("metatags")).toHaveAttribute(
      "data-title",
      "Page Not Found",
    );
    expect(screen.getByTestId("metatags")).toHaveAttribute(
      "data-robots",
      "noindex, follow",
    );
  });
});
