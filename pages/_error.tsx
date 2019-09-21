import * as React from 'react';
import { Description, Statement, Title } from '../components/common';
import Layout from '../components/Layout';

const ErrorPage = () => (
  <Layout>
    <Statement>
      <Title>404</Title>
      <Description></Description>
    </Statement>
  </Layout >
);

ErrorPage.getInitialProps = async ({ req, err }) => ({
  statusCode: req ? req.statusCode : err ? err.statusCode : 404
});

export default ErrorPage;

