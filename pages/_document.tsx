import Document, { DocumentContext, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import { PRISMIC_API_URL } from '../config/prismic';

export default class MyDocument extends Document {
  public static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  public setPrismic() {
    return {
      __html: `
        window.prismic = {
          endpoint: '${PRISMIC_API_URL}'
        };
      `,
    };
  }

  public render() {
    return (
      <html>
        <Head>
          <meta charSet='utf-8' />
          <meta name='viewport' content='initial-scale=1.0, width=device-width' key='viewport' />

          <link href='https:/fonts.googleapis.com/css?family=Oswald:400,800&display=swap&subset=cyrillic' rel='stylesheet' />
          <link href='https:/fonts.googleapis.com/css?family=Montserrat:400,800&display=swap&subset=cyrillic' rel='stylesheet' />

          <link rel='apple-touch-icon' sizes='57x57' href='/static/favicon/apple-icon-57x57.png' />
          <link rel='apple-touch-icon' sizes='60x60' href='/static/favicon/apple-icon-60x60.png' />
          <link rel='apple-touch-icon' sizes='72x72' href='/static/favicon/apple-icon-72x72.png' />
          <link rel='apple-touch-icon' sizes='76x76' href='/static/favicon/apple-icon-76x76.png' />
          <link rel='apple-touch-icon' sizes='114x114' href='/static/favicon/apple-icon-114x114.png' />
          <link rel='apple-touch-icon' sizes='120x120' href='/static/favicon/apple-icon-120x120.png' />
          <link rel='apple-touch-icon' sizes='144x144' href='/static/favicon/apple-icon-144x144.png' />
          <link rel='apple-touch-icon' sizes='152x152' href='/static/favicon/apple-icon-152x152.png' />
          <link rel='apple-touch-icon' sizes='180x180' href='/static/favicon/apple-icon-180x180.png' />
          <link rel='icon' type='image/png' sizes='192x192' href='/static/favicon/android-icon-192x192.png' />
          <link rel='icon' type='image/png' sizes='32x32' href='/static/favicon/favicon-32x32.png' />
          <link rel='icon' type='image/png' sizes='96x96' href='/static/favicon/favicon-96x96.png' />
          <link rel='icon' type='image/png' sizes='16x16' href='/static/favicon/favicon-16x16.png' />
          <link rel='manifest' href='/static/favicon/manifest.json' />
          <meta name='msapplication-TileColor' content='#ffffff' />
          <meta name='msapplication-TileImage' content='/static/favicon/ms-icon-144x144.png' />
          <meta name='theme-color' content='#ffffff' />

        </Head>
        <body>
          <Main />
          <NextScript />
          <script dangerouslySetInnerHTML={this.setPrismic()} />
          <script type='text/javascript' src='https:/static.cdn.prismic.io/prismic.min.js' />
        </body>
      </html>
    );
  }
}
