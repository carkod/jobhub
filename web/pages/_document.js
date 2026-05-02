import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#000000" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css"
        />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=UA-10612008-5"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag() {
                dataLayer.push(arguments);
              }
              gtag("js", new Date());
              gtag("config", "UA-10612008-5");
            `,
          }}
        />
      </Head>
      <body>
        <div
          style={{
            fontSize: '120em',
            position: 'fixed',
            top: '0.2em',
            left: '-0.7em',
            height: '100%',
            zIndex: -1,
          }}
        >
          Carlos
        </div>
        <div id="web">
          <Main />
        </div>
        <NextScript />
      </body>
    </Html>
  )
}
