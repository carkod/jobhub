import Script from "next/script";
import "../src/index.scss";
import PageWrapper from "./page-wrapper";

export const metadata = {
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
};

export const viewport = {
  themeColor: "#faf8f4",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <div id="web">
          <PageWrapper>{children}</PageWrapper>
        </div>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-WN6EYFXHFS"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag() {
              dataLayer.push(arguments);
            }
            gtag("js", new Date());
            gtag("config", "G-WN6EYFXHFS");
          `}
        </Script>
      </body>
    </html>
  );
}
