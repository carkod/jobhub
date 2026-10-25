import { renderToStaticMarkup } from "react-dom/server.node";
import RootLayout, { metadata, viewport } from "./layout";

jest.mock("next/script", () => ({
  __esModule: true,
  default: ({ children, id, src, strategy }) => (
    <script data-id={id} data-src={src} data-strategy={strategy}>
      {children}
    </script>
  ),
}));

jest.mock("./page-wrapper", () => ({
  __esModule: true,
  default: ({ children }) => <main data-testid="page-wrapper">{children}</main>,
}));

describe("RootLayout", () => {
  it("exports app metadata and viewport settings", () => {
    expect(metadata).toEqual({
      title: {
        default: "Carlos Wu",
        template: "%s | Carlos Wu",
      },
      description: "Carlos Wu — software engineer and entrepreneur in London.",
      manifest: "/manifest.json",
      icons: {
        icon: "/favicon.svg",
        shortcut: "/favicon.ico",
      },
    });
    expect(viewport).toEqual({ themeColor: "#faf8f4" });
  });

  it("renders the shared app shell around route content", () => {
    const markup = renderToStaticMarkup(
      <RootLayout>
        <p>Route content</p>
      </RootLayout>,
    );

    expect(markup).toContain('<html lang="en">');
    expect(markup).toContain('id="web"');
    expect(markup).toContain('data-testid="page-wrapper"');
    expect(markup).toContain("Route content");
    expect(markup).not.toContain("semantic.min.css");
    expect(markup).toContain("googletagmanager.com/gtag/js");
    expect(markup).toContain('data-id="google-analytics"');
  });
});
