import React from 'react';
import Document, { Head, Html, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html prefix="og: http://ogp.me/ns#">
        <Head>
          <meta name="robots" content="all" />
          <meta name="color-scheme" content="light dark" />
          <meta name="theme-color" content="black" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="icon" href="/favicon.svg" />
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-SSCV7PVEB3"></script>
          <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){
              dataLayer.push(arguments);
            }
            gtag('js', new Date());
            gtag('config', 'G-SSCV7PVEB3');
          </script>
        </Head>
        <body>
          <Main />
          <NextScript />
          @babel/plugin-proposal-decorators
        </body>
      </Html>
    );
  }
}
