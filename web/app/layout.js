import Script from "next/script";
import "../src/index.scss";
import PageWrapper from "./page-wrapper";
import Providers from "./providers";

export const metadata = {
  title: "Carlos Wu",
  manifest: "/manifest.json",
  icons: {
    shortcut: "/favicon.ico",
  },
};

export const viewport = {
  themeColor: "#000000",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body suppressHydrationWarning>
        <div id="web">
          <Providers>
            <PageWrapper>{children}</PageWrapper>
          </Providers>
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
