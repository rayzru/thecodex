import Link from 'next/link';
import * as React from 'react';
import { prismicClient } from '../api/prismicClient';
import { Description, Statement, StyledLink, Title } from '../components/common';
import Layout from '../components/Layout';

const Index = ({ title, uid }) => (
  <Layout>
    <Statement>
      <Link href={`/?slug=${uid}`} as={`/${uid}`} passHref >
        <StyledLink>
          <Title>{title}</Title>
        </StyledLink>
      </Link>
      <Description></Description>
    </Statement>
  </Layout >
);

Index.getInitialProps = async ({ ctx, query, router }) => {
  const client = prismicClient(ctx);
  console.log('client created', query, router);
  const statement = query.slug ? await client.getStatement(query.slug) : await client.getLastStatement();
  return { ...statement };
};

export default Index;
