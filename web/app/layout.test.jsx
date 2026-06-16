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

jest.mock("./providers", () => ({
  __esModule: true,
  default: ({ children }) => <div data-testid="providers">{children}</div>,
}));

jest.mock("./page-wrapper", () => ({
  __esModule: true,
  default: ({ children }) => <main data-testid="page-wrapper">{children}</main>,
}));

describe("RootLayout", () => {
  it("exports app metadata and viewport settings", () => {
    expect(metadata).toEqual({
      title: "Carlos Wu",
      manifest: "/manifest.json",
      icons: {
        shortcut: "/favicon.ico",
      },
    });
    expect(viewport).toEqual({ themeColor: "#000000" });
  });

  it("renders the shared app shell around route content", () => {
    const markup = renderToStaticMarkup(
      <RootLayout>
        <p>Route content</p>
      </RootLayout>,
    );

    expect(markup).toContain('<html lang="en">');
    expect(markup).toContain('id="web"');
    expect(markup).toContain('data-testid="providers"');
    expect(markup).toContain('data-testid="page-wrapper"');
    expect(markup).toContain("Route content");
    expect(markup).toContain("semantic.min.css");
    expect(markup).toContain("googletagmanager.com/gtag/js");
    expect(markup).toContain('data-id="google-analytics"');
  });
});
