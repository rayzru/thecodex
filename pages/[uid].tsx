import React, { useEffect, useState } from 'react';
import { BuildQueryURLArgs, predicate } from '@prismicio/client';
import { asText } from '@prismicio/helpers';
import { PrismicRichText } from '@prismicio/react';
import { PrismicDocument } from '@prismicio/types';
import Footer from 'components/Footer';
import Header from 'components/Header';
import Heading from 'components/Heading';
import Layout from 'components/Layout';
import Link from 'components/Link';
import { SiteSettings } from 'lib/settings';
import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { createClient, languages, linkResolver } from 'prismicio';

import style from '../styles/page.module.scss';
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
  const router = useRouter();
  const [queued, setQueued] = useState(false);

  const title = asText(statement?.data?.title);
  const description = asText(statement?.data?.description);
  const name = settings.title;
  const pageTitle = `${title} ${String.fromCharCode(9734)} ${name}`;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const url = router.query?.slug?.toString() || '/';

  const socialUrl = statement.uid
    ? '/api/social?' +
      new URLSearchParams({
        id: statement.uid || '',
        lang: settings.locale || '',
      }).toString()
    : '';

  useEffect(() => {
    function onKeyDown(e: KeyboardEventInit) {
      if (queued) {
        return;
      }
      if (e.key === 'ArrowLeft' && prevLink !== '/') {
        setQueued(true);
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        router.push(prevLink).finally(() => setQueued(false));
      }
      if (e.key === 'ArrowRight' && nextLink !== '/') {
        setQueued(true);
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        router.push(nextLink).finally(() => setQueued(false));
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [nextLink, prevLink, router, queued]);

  return (
    <Layout>
      <Head>
        <title>{pageTitle}</title>

        <meta name="description" content={description ?? ''} />
        <meta name="robots" content="index, nofollow" />

        <meta property="og:title" content={title ?? ''} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={socialUrl} />

        <meta name="twitter:title" content={title ?? ''} />
        <meta name="twitter:description" content={description ?? ''} />
        <meta name="twitter:image" content={socialUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:card" content="summary" />
      </Head>

      <Header title={settings.title} showLocales />

      <main className={style.page}>
        <article className={style.description}>
          <Heading headingLevel="h1" className={style.title}>
            {title}
          </Heading>
          <PrismicRichText field={statement?.data?.description} />
        </article>
      </main>
      <Footer>
        {statement?.alternate_languages?.length > 0 && (
          <nav className={style.nav_row}>
            {statement.alternate_languages.map((l) => (
              <Link key={l.uid} href={linkResolver(l)} locale={l.lang}>
                {l.lang === 'en-us' ? languages['en-us'] : languages['ru']}
              </Link>
            ))}
          </nav>
        )}
        <nav className={style.nav_row}>
          <Link
            className={style.arrow_link}
            href={prevLink}
            disabled={prevLink === '/'}
          >
            {String.fromCharCode(8592)}
          </Link>

          <Link
            className={style.arrow_link}
            href={nextLink}
            disabled={nextLink === '/'}
          >
            {String.fromCharCode(8594)}
          </Link>
        </nav>
      </Footer>
    </Layout>
  );
};

export default Statement;

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
    description: asText(settingsData.data.description) || '',
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
