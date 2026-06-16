import { act, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import HtmlText from "./HtmlText";
import Metatags from "./Metatags";
import NavLink from "./NavLink";
import Notification from "./Notification";
import { usePathname } from "next/navigation";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

function renderWithSnackBar(
  snackBar = { loading: false, message: null, error: false },
) {
  const reducer = (state = { snackBarReducer: snackBar }, action = {}) => {
    if (action.type === "SET_SNACK_BAR") {
      return { snackBarReducer: action.payload };
    }

    return state;
  };
  const store = createStore(reducer);

  render(
    <Provider store={store}>
      <Notification />
    </Provider>,
  );

  return store;
}

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

describe("Metatags", () => {
  beforeEach(() => {
    usePathname.mockReturnValue("/about");
    document.head.innerHTML = "";
    document.title = "";
    window.history.pushState({}, "", "/about");
  });

  it("sets document title and core SEO/social metadata", async () => {
    render(
      <Metatags
        title="About"
        description="Profile and website details"
        type="profile"
        robots="noindex, follow"
      />,
    );

    await waitFor(() => {
      expect(document.title).toBe("Carlos Wu — About");
    });

    expect(document.querySelector('meta[name="description"]')).toHaveAttribute(
      "content",
      "Carlos Wu — Profile and website details",
    );
    expect(document.querySelector('meta[name="robots"]')).toHaveAttribute(
      "content",
      "noindex, follow",
    );
    expect(document.querySelector('meta[property="og:title"]')).toHaveAttribute(
      "content",
      "Carlos Wu — About",
    );
    expect(document.querySelector('meta[property="og:type"]')).toHaveAttribute(
      "content",
      "profile",
    );
    expect(document.querySelector('meta[property="og:url"]')).toHaveAttribute(
      "content",
      "http://localhost/about",
    );
    expect(
      document.querySelector('meta[name="twitter:title"]'),
    ).toHaveAttribute("content", "Carlos Wu — About");
  });

  it("updates existing meta elements instead of duplicating them", async () => {
    const { rerender } = render(
      <Metatags title="First" description="First description" />,
    );

    await waitFor(() => {
      expect(document.title).toBe("Carlos Wu — First");
    });

    rerender(<Metatags title="Second" description="Second description" />);

    await waitFor(() => {
      expect(document.title).toBe("Carlos Wu — Second");
    });

    expect(document.querySelectorAll('meta[name="description"]')).toHaveLength(
      1,
    );
    expect(document.querySelector('meta[name="description"]')).toHaveAttribute(
      "content",
      "Carlos Wu — Second description",
    );
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

describe("Notification", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("renders snack bar messages from Redux state changes", async () => {
    const store = renderWithSnackBar();

    expect(screen.queryByText("PDF generated")).not.toBeInTheDocument();

    act(() => {
      store.dispatch({
        type: "SET_SNACK_BAR",
        payload: { loading: false, message: "PDF generated", error: false },
      });
    });

    expect(await screen.findByText("PDF generated")).toBeInTheDocument();
    expect(
      screen.getByText("PDF generated").closest(".ed-notification"),
    ).toHaveClass("ed-notification--success");
  });

  it("hides messages after the notification timeout", async () => {
    const store = renderWithSnackBar();

    act(() => {
      store.dispatch({
        type: "SET_SNACK_BAR",
        payload: { loading: false, message: "Something failed", error: true },
      });
    });

    expect(await screen.findByText("Something failed")).toBeInTheDocument();
    expect(
      screen.getByText("Something failed").closest(".ed-notification"),
    ).toHaveClass("ed-notification--error");

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(screen.queryByText("Something failed")).not.toBeInTheDocument();
  });
});
