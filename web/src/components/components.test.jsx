import { render, screen } from "@testing-library/react";
import HtmlText from "./HtmlText";
import NavLink from "./NavLink";
import { usePathname } from "next/navigation";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

describe("HtmlText", () => {
  it("renders parsed rich text inside the expected wrapper", () => {
    render(<HtmlText text="<p>Hello <strong>world</strong></p>" />);

    const wrapper = screen
      .getByText("Hello", { exact: false })
      .closest(".rte-text");
    expect(wrapper).toBeInTheDocument();
    expect(screen.getByText("world")).toHaveProperty("tagName", "STRONG");
  });

  it("renders an empty wrapper when no text is provided", () => {
    const { container } = render(<HtmlText />);

    expect(container.querySelector(".rte-text")).toBeEmptyDOMElement();
  });
});

describe("NavLink", () => {
  it("marks exact links active only on exact path matches", () => {
    usePathname.mockReturnValue("/about/me");

    render(
      <>
        <NavLink
          to="/about/me"
          exact
          activeClassName="active"
          className="nav-link"
        >
          About me
        </NavLink>
        <NavLink
          to="/about"
          exact
          activeClassName="active"
          className="nav-link"
        >
          About
        </NavLink>
      </>,
    );

    expect(screen.getByRole("link", { name: "About me" })).toHaveClass(
      "nav-link",
      "active",
    );
    expect(screen.getByRole("link", { name: "About" })).toHaveClass("nav-link");
    expect(screen.getByRole("link", { name: "About" })).not.toHaveClass(
      "active",
    );
  });

  it("marks parent links active for nested paths", () => {
    usePathname.mockReturnValue("/blog/post-one");

    render(
      <NavLink to="/blog" activeClassName="active">
        Blog
      </NavLink>,
    );

    expect(screen.getByRole("link", { name: "Blog" })).toHaveClass("active");
  });

  it("uses href when provided", () => {
    usePathname.mockReturnValue("/cv/en-GB/latest");

    render(
      <NavLink href="/cv/en-GB/latest" activeClassName="active">
        Latest CV
      </NavLink>,
    );

    expect(screen.getByRole("link", { name: "Latest CV" })).toHaveAttribute(
      "href",
      "/cv/en-GB/latest",
    );
    expect(screen.getByRole("link", { name: "Latest CV" })).toHaveClass(
      "active",
    );
  });
});
