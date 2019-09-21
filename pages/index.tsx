import * as React from 'react';
import styled from 'styled-components';
import { prismicClient } from '../api/prismicClient';
import Layout from '../components/Layout';

const Index = ({ title }) => (
  <Layout>
    <Statement>
      <Title>{title}</Title>
      <Description></Description>
    </Statement>
  </Layout >
);

Index.getInitialProps = async ({ ctx }: { ctx: any }) => {
  const client = prismicClient(ctx);
  console.log('client created');
  const statement = await client.getLastStatement();
  return { ...statement };
};

const Statement = styled.article`
  flex: 1;
  align-items: center;
  justify-content: center;
  display: flex;
`;

const Title = styled.h1`
  font-size: 7.9vw;
  height: 20%;
  font-weight: 500;
  font-family: 'Oswald';
  color: #fff;
  text-align: center;
  width: 100%;
`;

const Description = styled.div`

`;

export default Index;
