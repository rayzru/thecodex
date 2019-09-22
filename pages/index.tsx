import cookie from 'js-cookie';
import Link from 'next/link';
import Router from 'next/router';
import * as React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useSwipeable } from 'react-swipeable';
import { Languages, prismicClient } from '../api/prismicClient';
import { Description, Statement, StyledLink, Title } from '../components/common';
import Layout from '../components/Layout';
import Navigation from '../components/Navigation';

const Index = ({ statements: [{ title, uid }], pagination: { page, totalPages }, locale }) => {

  const nextPage = () => Router.push({ pathname: Router.pathname, query: { page: page + (page > 1 ? -1 : 0) } }, '/');
  const prevPage = () => Router.push({ pathname: Router.pathname, query: { page: page + (page < totalPages ? 1 : 0) } }, '/');

  const handlers = useSwipeable({
    onSwipedLeft: () => prevPage(),
    onSwipedRight: () => nextPage(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  useHotkeys('left', () => nextPage());
  useHotkeys('right', () => prevPage());


  return (
    <Layout locale={locale} >
      <Statement {...handlers}>
        <Link href={`/?slug=${uid}`} as={`/${uid}`}>
          <StyledLink>
            <Title>{title}</Title>
          </StyledLink>
        </Link>
        <Description></Description>
      </Statement>
      <Navigation page={page} totalPages={totalPages} />
    </Layout >
  );
};

Index.getInitialProps = async ({ req, ctx, query }) => {
  const locale = (req) ? Languages.en : cookie.get('locale') as Languages || Languages.en;
  const client = prismicClient(ctx, locale);
  const statement = query.slug ? await client.getStatement(query.slug) : await client.getStatements({ page: query.page || 1 });
  return { ...statement, locale };
};

export default Index;
