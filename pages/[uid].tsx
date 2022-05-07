import * as React from 'react';
import styled from '@emotion/styled';
import { BuildQueryURLArgs, predicate } from '@prismicio/client';
import { asText } from '@prismicio/helpers';
import { PrismicDocument } from '@prismicio/types';
import Header from 'components/Header';
import Heading from 'components/Heading';
import { SiteSettings } from 'lib/settings';
import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { createClient, languages, linkResolver } from 'prismicio';

interface Props {
  statement: PrismicDocument;
  settings: SiteSettings;
  nextLink: string;
  prevLink: string;
}

const Statement: NextPage<Props> = ({
  statement,
  settings,
  nextLink,
  prevLink,
}) => {
  const title = asText(statement.data.title);
  const router = useRouter();
  const [key, setKey] = React.useState<string | undefined>();

  const handleKeydown: EventListener = (evt: KeyboardEventInit) => {
    if (evt.key === 'ArrowLeft' || evt.key === 'ArrowRight') {
      setKey(evt.key);
    }
  };

  React.useEffect(() => {
    async function handleRouteChange(link: string) {
      if (link !== '' && link !== '/') {
        await router.push(link);
      }
    }

    if (key === 'ArrowLeft') {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      handleRouteChange(prevLink);
    }
    if (key === 'ArrowRight') {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      handleRouteChange(nextLink);
    }
  }, [key]);

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeydown, false);
    return () => window.removeEventListener('keydown', handleKeydown);
  });

  return (
    <Layout>
      <Head>
        <title>
          {title} {String.fromCharCode(9734)} {settings.title}
        </title>
      </Head>

      <Header title={settings.title} />

      <PageWrapper>
        <StyledHeading headingLevel="h1">
          {asText(statement.data.title)}
        </StyledHeading>
        <Description>{asText(statement.data.description)}</Description>
      </PageWrapper>
      <Footer>
        <NavigationRow>
          {statement.alternate_languages &&
            statement.alternate_languages.map((l) => (
              <Link key={l.uid} href={linkResolver(l)} passHref locale={l.lang}>
                <Lang>
                  {l.lang === 'en-us' ? languages['en-us'] : languages['ru']}
                </Lang>
              </Link>
            ))}
        </NavigationRow>
        <NavigationRow>
          {prevLink !== '' && prevLink !== '/' ? (
            <Link href={prevLink} passHref>
              <NavLink>{String.fromCharCode(8592)}</NavLink>
            </Link>
          ) : (
            <NavLinkBlank>{String.fromCharCode(8592)}</NavLinkBlank>
          )}

          {nextLink !== '' && nextLink !== '/' ? (
            <Link href={nextLink} passHref>
              <NavLink>{String.fromCharCode(8594)}</NavLink>
            </Link>
          ) : (
            <NavLinkBlank>{String.fromCharCode(8594)}</NavLinkBlank>
          )}
        </NavigationRow>
      </Footer>
    </Layout>
  );
};

export default Statement;

const Layout = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  min-height: 100vh;
`;

const Footer = styled.footer`
  margin-top: auto;
  margin-bottom: 4em;
`;

const NavigationRow = styled.nav`
  display: flex;
  flex-flow: row nowrap;
  column-gap: 36px;
  justify-content: center;
  margin: 2em 0;
`;

const NavLink = styled.a`
  text-decoration: none;

  font-size: 2em;
  font-weight: 200;
  font-family: Arial, sans-serif;
  color: #eeeeee99;
  transition: 0.3s all;
  &:hover {
    color: #fff;
  }
`;

const NavLinkBlank = styled.span`
  font-size: 2em;
  font-weight: 200;
  font-family: Arial, sans-serif;
  color: #eeeeee33;
`;

const Lang = styled.a`
  font-size: 0.6em;
  text-transform: uppercase;
  text-decoration: none;
  font-weight: 400;
  font-family: Oswald, sans-serif;
  color: #eeeeee99;
  transition: 0.3s all;
  &:hover {
    color: #fff;
  }
`;

const PageWrapper = styled.main`
  display: flex;
  flex-flow: column;
  margin: 20px auto;
  max-width: 800px;
`;

const StyledHeading = styled(Heading)`
  font-size: 5em;
  font-weight: 600;
  color: #eee;
  font-family: 'Oswald';
  text-align: center;
  margin: 0 auto;
  text-shadow: -1px -1px 1px rgba(0, 0, 0, 0.3);

  @media only screen and (min-width: 768px) {
    font-size: 5em;
  }
  @media only screen and (max-width: 767px) {
    font-size: 4em;
  }
  @media only screen and (max-width: 767px) and (orientation: portrait) {
    font-size: 3em;
  }
`;

export const Description = styled.article`
  margin-top: 3em;
  font-size: 1em;
  line-height: 1.4em;
  text-align: center;
  color: #eee;
  font-family: 'Montserrat', sans-serif;
  text-shadow: -1px -1px 1px rgba(0, 0, 0, 0.3);

  a {
    color: #cdf;
  }

  @media only screen and (min-width: 768px) {
    font-size: 1.5em;
  }

  @media only screen and (max-width: 767px) {
    font-size: 1em;
  }

  @media only screen and (max-width: 767px) and (orientation: portrait) {
    font-size: 1em;
  }
`;

export const getStaticProps: GetStaticProps = async ({
  params,
  locale,
  previewData,
}) => {
  const client = createClient({ previewData });

  const opts = { lang: locale };
  const uid = params?.uid?.toString() || '';
  const settingsData = await client.getSingle('settings', opts);
  const settings: SiteSettings = {
    title: asText(settingsData.data.title) || 'The Codex',
    locale,
  };
  const statement = await client.getByUID('statement', uid, opts);

  const nextOpts: Partial<BuildQueryURLArgs> = {
    ...opts,
    predicates: [predicate.at('document.type', 'statement')],
    orderings: {
      field: 'document.first_publication_date',
      direction: 'desc',
    },
    after: statement.id,
    pageSize: 1,
  };

  const prevOpts: Partial<BuildQueryURLArgs> = {
    ...nextOpts,
    orderings: {
      field: 'document.first_publication_date',
      direction: 'asc',
    },
  };

  let nextStatement, prevStatement;

  try {
    nextStatement = (await client.get(nextOpts))?.results?.[0];
    prevStatement = (await client.get(prevOpts))?.results?.[0];
    // eslint-disable-next-line no-empty
  } catch (err) {}
  return {
    props: {
      statement,
      settings,
      nextLink: linkResolver(nextStatement),
      prevLink: linkResolver(prevStatement),
    },
  };
};

export async function getStaticPaths() {
  const client = createClient();

  const pages = await client.getAllByType('statement', { lang: '*' });

  return {
    paths: pages.map((page) => {
      return {
        params: { uid: page.uid },
        locale: page.lang,
      };
    }),
    fallback: false,
  };
}
