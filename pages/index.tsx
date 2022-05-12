import * as React from 'react';
import styled from '@emotion/styled';
import { asText } from '@prismicio/helpers';
import { FilledLinkToDocumentField, PrismicDocument } from '@prismicio/types';
import Footer from 'components/Footer';
import Header from 'components/Header';
import Layout from 'components/Layout';
import { SiteSettings } from 'lib/settings';
import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { createClient, linkResolver } from 'prismicio';

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
      </Head>
      <Header title={settings.title} />
      <StatementList>
        {statements.map(({ uid: routeUid, type, data: { title } }) => {
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
            <Link key={uid} href={linkResolver(link)} passHref>
              <StatementLink>{asText(title)}</StatementLink>
            </Link>
          );
        })}
      </StatementList>
      <Footer />
    </Layout>
  );
};

export default Index;

const StatementList = styled.div`
  display: flex;
  flex-flow: column;
`;

const StatementLink = styled.a`
  text-decoration: none;
  line-height: 2em;
  font-size: 1.5em;
  font-weight: 400;
  font-family: 'Oswald';
  text-shadow: -1px -1px 1px rgba(0, 0, 0, 0.3);
  transition: 0.5s all;
  display: inline-block;
  color: #ffffffcc;

  &:hover {
    color: #99dfff;
  }
`;

export const getStaticProps: GetStaticProps = async ({
  locale,
  previewData,
}) => {
  const client = createClient({ previewData });
  const opts = { lang: locale };

  const settingsData = await client.getSingle('settings', opts);
  const settings: SiteSettings = {
    title: asText(settingsData.data.title) || 'The Codex',
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
