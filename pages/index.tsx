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

const Index = ({ statements: [{ title, uid }], pagination: { page, totalPages }, locale, slug }) => {

  console.log(slug);

  const nextPage = () => Router.push({ pathname: Router.pathname, query: { page: page + (page > 1 ? -1 : 0) } }, '/');
  const prevPage = () => Router.push({ pathname: Router.pathname, query: { page: page + (page < totalPages ? 1 : 0) } }, '/');
  const homePage = () => Router.push({ pathname: '/', query: {} }, '/');

  let handlers = {};
  if (slug) {
    handlers = useSwipeable({
      onSwipedUp: () => homePage(),
      onSwipedLeft: () => { },
      onSwipedRight: () => { },
      preventDefaultTouchmoveEvent: true,
      trackMouse: true
    });
    useHotkeys('left', () => { });
    useHotkeys('right', () => { });
    useHotkeys('up', () => homePage());
  } else {
    handlers = useSwipeable({
      onSwipedUp: () => { },
      onSwipedLeft: () => prevPage(),
      onSwipedRight: () => nextPage(),
      preventDefaultTouchmoveEvent: true,
      trackMouse: true
    });

    useHotkeys('left', () => nextPage());
    useHotkeys('right', () => prevPage());
    useHotkeys('up', () => { });
  }

  return (
    <Layout locale={locale} >
      <Statement {...handlers}>
        {slug
          ? (<Title>{title}</Title>)
          : (
            <Link href={`/?slug=${uid}`} as={`/${uid}`} passHref>
              <StyledLink>
                <Title>{title}</Title>
              </StyledLink>
            </Link>
          )
        }
        <Description></Description>
      </Statement>
      <Navigation page={page} totalPages={totalPages} slug={slug} />
    </Layout >
  );
};

Index.getInitialProps = async ({ req, ctx, query: { page, slug } }) => {
  const locale = (req) ? Languages.en : cookie.get('locale') as Languages || Languages.en;
  const client = prismicClient(ctx, locale);
  const statement = slug ? await client.getStatement(slug) : await client.getStatements({ page: page || 1 });
  return { ...statement, locale, slug };
};

export default Index;
