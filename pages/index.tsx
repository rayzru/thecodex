import * as React from 'react';
import { asText } from '@prismicio/helpers';
import { FilledLinkToDocumentField, PrismicDocument } from '@prismicio/types';
import Footer from 'components/Footer';
import Header from 'components/Header';
import Layout from 'components/Layout';
import Link from 'components/Link';
import { SiteSettings } from 'lib/settings';
import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import NextLink from 'next/link';
import { createClient, languages, linkResolver } from 'prismicio';

import style from '../styles/index.module.scss';

interface Props {
  statements: PrismicDocument[];
  settings: SiteSettings;
  locale: string;
}

const Index: NextPage<Props> = ({ statements = [], settings, locale }) => {
  return (
    <Layout>
      <Head>
        <title>{settings.title}</title>
        <meta name="description" content={settings.description} />
        <meta name="robots" content="index, nofollow" />

        <meta property="og:title" content={settings.title} />
        <meta property="og:url" content={'/'} />

        <meta name="twitter:title" content={settings.title} />
        <meta name="twitter:description" content={settings.description} />
      </Head>
      <Header title={settings.title}>
        <nav className={style.locales}>
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
          ({ uid: routeUid, type, data: { title, description } }) => {
            const uid = routeUid?.toString() || '';
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
                    <p>{asText(description)}</p>
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

export const getStaticProps: GetStaticProps = async ({
  locale,
  previewData,
}) => {
  const client = createClient({ previewData });
  const opts = { lang: locale };

  const settingsData = await client.getSingle('settings', opts);
  const settings: SiteSettings = {
    title: asText(settingsData.data.title) ?? 'The Codex',
    description: asText(settingsData.data.description) ?? '',
    locale,
  };
  const statements = await client.getAllByType('statement', { lang: locale });

  return {
    props: {
      statements,
      settings,
      locale,
    },
  };
};
