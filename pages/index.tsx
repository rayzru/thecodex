import cookie from 'js-cookie';
import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import { RichText } from 'prismic-reactjs';
import * as React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useSwipeable } from 'react-swipeable';
import { Languages, linkResolver, prismicClient, ResponseError } from '../api/prismicClient';
import { Description, Statement, StyledLink, Title } from '../components/common';
import Layout from '../components/Layout';
import Navigation from '../components/Navigation';
import { getProjectTitle } from '../lib/helpers';
import ErrorPage from './_error';

const Index = ({ statements, pagination, locale, slug }) => {

  if (!statements || statements.length === 0) {
    return <ErrorPage />;
  }

  const [{ title, uid, description }] = statements;
  const { page, totalPages } = pagination;

  const homePage = () => Router.push({ pathname: '/', query: { locale } }, '/');
  const nextPage = () => Router.push({ pathname: Router.pathname, query: { locale, page: page + (page > 1 ? -1 : 0) } }, `/${locale}`);
  const prevPage = () => Router.push({ pathname: Router.pathname, query: { locale, page: page + (page < totalPages ? 1 : 0) } }, `/${locale}`);

  const handlers = useSwipeable({
    onSwipedUp: () => slug ? {} : homePage(),
    onSwipedLeft: () => slug ? {} : prevPage(),
    onSwipedRight: () => slug ? {} : nextPage(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });
  useHotkeys('up', () => slug ? {} : homePage());
  useHotkeys('left', () => slug ? {} : prevPage());
  useHotkeys('right', () => slug ? {} : nextPage());


  return (
    <Layout locale={locale} >
      <Head>
        <title>{title}{' — '}{getProjectTitle(locale)}</title>
      </Head>
      <Statement {...handlers}>
        {slug
          ? (<Title>{title}</Title>)
          : (
            <Link href={`/index?slug=${uid}&locale=${locale}`} as={`/${locale}/${uid}`} passHref>
              <StyledLink>
                <Title>{title}</Title>
              </StyledLink>
            </Link>
          )
        }
        <Description>
          <RichText render={description} linkResolver={linkResolver} />
        </Description>
      </Statement>
      <Navigation page={page} totalPages={totalPages} slug={slug} locale={locale} />
    </Layout >
  );
};

Index.getInitialProps = async ({ req, res, ctx, query: { page, slug, locale } }) => {
  const lang = locale ? locale : (req) ? Languages.en : cookie.get('locale') as Languages || Languages.en;
  const client = prismicClient(ctx, lang);

  if (slug) {
    const slugProps = await client.getStatement(slug)
      .catch(err => {
        if (err instanceof ResponseError) {
          // console.log(err);
          res.statusCode = 404;
        }
      });
    return { ...slugProps, locale: lang, slug };
  }

  const listProps = await client.getStatements({ page: page || 1 });
  return { ...listProps, locale: lang };
};

export default Index;
