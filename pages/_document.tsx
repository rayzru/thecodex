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
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
