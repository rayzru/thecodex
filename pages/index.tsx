import cookie from 'js-cookie';
import * as React from 'react';
import { Languages, prismicClient } from '../api/prismicClient';
import { Description, Statement, Title } from '../components/common';
import Layout from '../components/Layout';

const Index = ({ title, locale }) => (
  <Layout locale={locale}>
    <Statement>
      <Title>{title}</Title>
      <Description></Description>
    </Statement>
  </Layout >
);

Index.getInitialProps = async ({ req, ctx, query }) => {
  const locale = (req) ? Languages.en : cookie.get('locale') || Languages.en;
  const client = prismicClient(ctx, locale);
  const statement = query.slug ? await client.getStatement(query.slug) : await client.getLastStatement();
  return { ...statement, locale };
};

export default Index;
