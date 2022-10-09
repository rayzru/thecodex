/* eslint-disable @next/next/no-head-element */
import { asText } from '@prismicio/helpers';
import { PrismicRichText } from '@prismicio/react';
import { PrismicDocument } from '@prismicio/types';
import { Montserat, Oswald } from 'lib/fonts';
import { ogImageConfig } from 'lib/settings';
import { Locale, Locales } from 'lib/types';
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

  html {
    font-size: ${Math.round((ogImageConfig.width || 600) / 40)}px;
  }

  body {
    font-size: 1em;
    font-family: Montserat, 'Open Sans', Helvetica, Arial;
    display: flex;
    flex-direction: column;
    min-height: 100%;
    margin: 0;
    color: white;
    row-gap: 1em;
  }

  h1 {
    font-family: Oswald, Arial, sans-serif;
    font-size: 4em;
    margin: 0;
    line-height: 1.1;
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
  }

  .content {
    display: flex;
    flex-direction: column;
    flex: 1;
    row-gap: 1.5em;
    justify-content: center;
  }

  footer {
    flex: 0;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    color: #e7c416;
    text-transform: uppercase;
    display: flex;
    margin-bottom: 1.5em;
    font-size: 1em;
  }

  .link {
    opacity: 0.8;
    text-decoration: underline;
    font-size: 0.8em;
    margin-top: 0.1em;
  }

  .logo {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2em;
    height: 2em;
    border-radius: 50%;
    border: 0.3em solid #e7c416;
  }

  .logo svg {
    height: 1.5em;
    width: auto;
    fill: #ffffff;
    color: #fff;
  }

  .row {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }

  .logo:after {
    width: 0.3em;
    height: 0.3em;
    content: '';
    border-radius: 50%;
    background-color: #e7c416;
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
      const locale =
        lang && Locales.includes(lang as Locale) ? lang : Locales[0];
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
                  <PrismicRichText
                    field={(statement as PrismicDocument)?.data?.title}
                  />
                ) : (
                  <h1>{projectName}</h1>
                )}

                {false && !error && (
                  <PrismicRichText
                    field={(statement as PrismicDocument)?.data?.description}
                  />
                )}
              </div>
              <footer>
                <div className="row">
                  <div>{projectName}</div>
                  <div className="link">theCodex.ru</div>
                </div>
                <div>
                  <div className="logo">
                    <svg
                      width="6"
                      height="9"
                      viewBox="0 0 6 9"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.904 7.608H5.016V9H1.968C1.44 8.504 1.04 7.876 0.768 7.116C0.496 6.356 0.36 5.576 0.36 4.776C0.36 3.968 0.512 3.192 0.816 2.448C1.12 1.704 1.572 1.088 2.172 0.599999H5.016V2.04H2.904C2.688 2.288 2.5 2.688 2.34 3.24C2.188 3.792 2.112 4.32 2.112 4.824C2.112 5.328 2.188 5.856 2.34 6.408C2.5 6.96 2.688 7.36 2.904 7.608Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                </div>
              </footer>
            </div>
          </body>
        </html>
      );
    },
  },
  ...ogImageConfig,
});
