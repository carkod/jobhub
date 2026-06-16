import { render, screen } from "@testing-library/react";
import PageWrapper from "./page-wrapper";
import { usePathname } from "next/navigation";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

jest.mock("../src/views/Layout", () => ({
  __esModule: true,
  default: ({ children }) => <section data-testid="layout">{children}</section>,
}));

describe("PageWrapper", () => {
  it("wraps route content in the shared layout and transition container", () => {
    usePathname.mockReturnValue("/about");

    render(
      <PageWrapper>
        <h1>About page</h1>
      </PageWrapper>,
    );

    expect(screen.getByTestId("layout")).toContainElement(
      screen.getByRole("main"),
    );
    expect(screen.getByRole("main")).toHaveClass("ed-main");
    expect(screen.getByText("About page").parentElement).toHaveClass(
      "page-transition",
    );
  });
});
