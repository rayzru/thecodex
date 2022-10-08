/* eslint-disable @next/next/no-head-element */
import { asText } from '@prismicio/helpers';
import { PrismicRichText } from '@prismicio/react';
import { Montserat, Oswald } from 'lib/fonts';
import { Locales } from 'lib/strings';
import { withOGImage } from 'next-api-og-image';
import { createClient } from 'prismicio';

const style = `
  @font-face {
      font-family: 'Montserat';
      src: url(data:font/truetype;charset=utf-8;base64,${Montserat}) format('truetype');
      font-weight: normal;
      font-style: normal;
  }

   @font-face {
      font-family: 'Oswald';
      src: url(data:font/truetype;charset=utf-8;base64,${Oswald}) format('truetype');
      font-weight: normal;
      font-style: normal;
  }

  body {
    font-size: 15px;
    font-family: Montserat, 'Open Sans', Helvetica, Arial;
    display: flex;
    flex-direction: column;
    min-height: 100%;
    margin: 0;
    color: white;
    row-gap: 20px;
  }

  h1 {
    font-family: Oswald, Arial, sans-serif;
    font-size: 60px;
    margin: 0;
    line-height: 1.1em;
  }

  p {
    line-height: 1.3em;
  }


  .wrap {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 0 50px;
    background-color: black;
    background: linear-gradient(132deg, black, #1b222c);
  }

  .content {
    display: flex;
    flex-direction: column;
    flex: 1;
    row-gap: 30px;
    justify-content: center;
  }

  footer {
    flex: 0;
    color: #e7c416;
    text-transform: uppercase;
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
    font-size: 13px;
  }
`;

enum Params {
  'lang',
  'id',
}

export default withOGImage<'query', keyof typeof Params>({
  template: {
    react: async ({ id, lang }) => {
      const client = createClient();
      const locale = lang && Locales.includes(lang) ? lang : Locales[0];
      const opts = { lang: locale };
      let error = false;
      const settings = await client.getSingle('settings', opts);
      const statement = await client
        .getByUID('statement', id, opts)
        .catch(() => (error = true));

      const projectName = (asText(settings.data.title) || 'The Codex')
        .split(' ')
        .join(String.fromCharCode(183));

      return (
        <html lang={locale}>
          <head>
            <meta charSet="UTF-8" />
            <style dangerouslySetInnerHTML={{ __html: style }} />
          </head>
          <body>
            <div className="wrap">
              <div className="content">
                {!error ? (
                  <PrismicRichText field={statement?.data?.title} />
                ) : (
                  <h1>{projectName}</h1>
                )}

                {!error && (
                  <PrismicRichText field={statement?.data?.description} />
                )}
              </div>
              <footer>
                <div>{projectName}</div>
                <div>theCodex.ru</div>
              </footer>
            </div>
          </body>
        </html>
      );
    },
  },
  quality: 90,
  width: 600,
  height: 430,
  cacheControl: 'public, max-age=604800, immutable',
  dev: {
    inspectHtml: false,
  },
});
