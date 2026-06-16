import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import PageWrapper from "./page-wrapper";
import { usePathname } from "next/navigation";

const COOKIE_ACK_KEY = "carloswf_cookie_ack_v1";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

jest.mock("../src/views/Layout", () => ({
  __esModule: true,
  default: ({ children }) => <section data-testid="layout">{children}</section>,
}));

describe("PageWrapper", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

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

  it("shows the cookie banner until it is acknowledged", async () => {
    usePathname.mockReturnValue("/");

    render(
      <PageWrapper>
        <h1>Home page</h1>
      </PageWrapper>,
    );

    expect(await screen.findByLabelText("Cookie notice")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "OK" }));

    await waitFor(() => {
      expect(screen.queryByLabelText("Cookie notice")).not.toBeInTheDocument();
    });
    expect(window.localStorage.getItem(COOKIE_ACK_KEY)).toBe("true");
  });

  it("does not show the cookie banner after acknowledgement", async () => {
    usePathname.mockReturnValue("/");
    window.localStorage.setItem(COOKIE_ACK_KEY, "true");

    render(
      <PageWrapper>
        <h1>Home page</h1>
      </PageWrapper>,
    );

    await waitFor(() => {
      expect(screen.queryByLabelText("Cookie notice")).not.toBeInTheDocument();
    });
  });
});
