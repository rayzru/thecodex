import * as React from 'react';
import { asText } from '@prismicio/helpers';
import { FilledLinkToDocumentField, PrismicDocument } from '@prismicio/types';
import Footer from 'components/Footer';
import Header from 'components/Header';
import Layout from 'components/Layout';
import Link from 'components/Link';
import SEO from 'components/seo';
import { useSnackbarContext } from 'components/SnackbarProvider';
import { getDomain, getSettings, SiteSettings } from 'lib/settings';
import { Locale } from 'lib/types';
import { GetStaticProps, NextPage } from 'next';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { createClient, languages, linkResolver } from 'prismicio';

import style from '../styles/index.module.scss';

interface Props {
  statements: PrismicDocument[];
  settings: SiteSettings;
  locale: string;
}

const Index: NextPage<Props> = ({ statements = [], settings, locale }) => {
  const { asPath } = useRouter();
  const URL = `${getDomain()}${asPath}`;
  const socialUrl = `${getDomain()}/api/social/${locale}}/-`;

  const { openSnackbar } = useSnackbarContext();

  return (
    <Layout>
      <SEO
        title={settings.title}
        url={URL}
        imageUrl={socialUrl}
        siteName={settings.title}
        locale={locale}
      >
        {Object.entries(languages)
          .filter(([l]) => locale !== l)
          .map(([l]) => (
            <link
              key={l}
              rel="alternate"
              hrefLang={l}
              href={`${getDomain()}/${l}`}
            />
          ))}
      </SEO>

      <Header title={settings?.title || ''}>
        <nav className={style.locales}>
          <Link
            key={'copy'}
            href="#"
            locale={settings.locale}
            className={style.locale}
            onClick={(e) => {
              // console.log(e);
              e.preventDefault();
              openSnackbar(settings.copySuccess as string);
              navigator.clipboard.writeText(URL);
            }}
          >
            {settings.copyLabel}
          </Link>
          {Object.entries(languages)
            .filter(([l]) => locale !== l)
            .map(([l, v]) => (
              <Link key={l} href="/" locale={l} className={style.locale}>
                {v}
              </Link>
            ))}
        </nav>
      </Header>
      <div className={style.list}>
        {statements.map(
          ({ uid: routeUid, type, data: { title, excerpt, description } }) => {
            const uid = routeUid?.toString() || '';
            const descr = excerpt
              ? excerpt
              : asText(description)?.split('. ', 1)[0];
            const link: FilledLinkToDocumentField<string, string, never> = {
              uid,
              type,
              link_type: 'Document',
              id: uid,
              tags: [],
              lang: locale,
            };
            return (
              <NextLink key={uid} href={linkResolver(link)} passHref>
                <a className={style.card}>
                  <h2 className={style.title}>{asText(title)}</h2>
                  <div className={style.description}>
                    <p>{descr}</p>
                  </div>
                </a>
              </NextLink>
            );
          }
        )}
      </div>
      <Footer />
    </Layout>
  );
};

export default Index;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const client = createClient();
  const settings = await getSettings(locale as Locale, client);

  const statements = await client.getAllByType('statement', { lang: locale });

  return {
    props: {
      statements,
      settings,
      locale,
    },
  };
};
