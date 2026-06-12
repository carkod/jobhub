import { Lato } from "next/font/google";
import Script from "next/script";
import "../src/index.scss";
import PageWrapper from "./page-wrapper";
import Providers from "./providers";

const lato = Lato({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-lato",
});

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
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css"
        />
      </head>
      <body>
        <div id="web">
          <Providers>
            {/* <div className={lato.className}> */}
              <PageWrapper>{children}</PageWrapper>
            {/* </div> */}
          </Providers>
        </div>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=UA-10612008-5"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag() {
              dataLayer.push(arguments);
            }
            gtag("js", new Date());
            gtag("config", "UA-10612008-5");
          `}
        </Script>
      </body>
    </html>
  );
}
