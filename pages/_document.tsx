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
          <meta name='viewport' content='initial-scale=1.0, width=device-width' />
          <link href='https://fonts.googleapis.com/css?family=Oswald:400,800&display=swap&subset=cyrillic' rel='stylesheet' />
          <link href='https://fonts.googleapis.com/css?family=Montserrat:400,800&display=swap&subset=cyrillic' rel='stylesheet' />
        </Head>
        <body>
          <Main />
          <NextScript />
          <script dangerouslySetInnerHTML={this.setPrismic()} />
          <script type='text/javascript' src='https://static.cdn.prismic.io/prismic.min.js' />
        </body>
      </html>
    );
  }
}
