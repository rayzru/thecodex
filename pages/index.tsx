import cookie from 'js-cookie';
import Link from 'next/link';
import * as React from 'react';
import { Languages, prismicClient } from '../api/prismicClient';
import { Description, Statement, StyledLink, Title } from '../components/common';
import Layout from '../components/Layout';
import Navigation from '../components/Navigation';

const Index = ({ statements: [{ title, uid }], pagination, locale }) => (
  <Layout locale={locale}>
    <Statement>
      <Link href={`/?slug=${uid}`} as={`/${uid}`}>
        <StyledLink>
          <Title>{title}</Title>
        </StyledLink>
      </Link>
      <Description></Description>
    </Statement>
    <Navigation pagination={pagination} />
  </Layout >
);

Index.getInitialProps = async ({ req, ctx, query }) => {
  console.log(query)
  const locale = (req) ? Languages.en : cookie.get('locale') as Languages || Languages.en;
  const client = prismicClient(ctx, locale);
  const statement = query.slug ? await client.getStatement(query.slug) : await client.getStatements({ page: query.page || 1 });
  console.log(statement);
  return { ...statement, locale };
};

export default Index;
