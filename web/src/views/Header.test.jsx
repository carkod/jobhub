import { render, screen, waitFor } from "@testing-library/react";
import Header from "./Header";
import { fetchCVNav } from "../actions/cv";
import { fetchPortfolioNav } from "../actions/res";

jest.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

jest.mock("../actions/cv", () => ({
  fetchCVNav: jest.fn(),
}));

jest.mock("../actions/res", () => ({
  fetchPortfolioNav: jest.fn(),
}));

describe("Header navigation", () => {
  beforeEach(() => {
    fetchCVNav.mockResolvedValue([
      {
        _id: "cv-id",
        slug: "platform-engineer",
        navName: "Platform CV",
        cats: { locale: "en-GB" },
      },
    ]);
    fetchPortfolioNav.mockResolvedValue([
      {
        _id: "project-one",
        cats: { locale: "en-GB", position: "Engineering" },
      },
      {
        _id: "project-two",
        cats: { locale: "en-GB", position: "Engineering" },
      },
    ]);
  });

  it("links dropdown options directly to detail routes", async () => {
    render(<Header />);

    await waitFor(() => {
      expect(screen.getByRole("link", { name: "Platform CV" })).toHaveAttribute(
        "href",
        "/cv/en-GB/platform-engineer",
      );
    });

    const portfolioLinks = screen.getAllByRole("link", {
      name: "Engineering",
    });
    expect(portfolioLinks).toHaveLength(1);
    expect(portfolioLinks[0]).toHaveAttribute(
      "href",
      "/portfolio/en-GB/Engineering",
    );
    expect(screen.queryByRole("link", { name: "CV" })).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "Portfolio" }),
    ).not.toBeInTheDocument();
  });
});
