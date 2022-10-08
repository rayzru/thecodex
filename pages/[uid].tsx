import React, { useEffect, useState } from 'react';
import { BuildQueryURLArgs, predicate } from '@prismicio/client';
import { asText } from '@prismicio/helpers';
import { PrismicRichText } from '@prismicio/react';
import Footer from 'components/Footer';
import Header from 'components/Header';
import Heading from 'components/Heading';
import Layout from 'components/Layout';
import Link from 'components/Link';
import SEO from 'components/seo';
import { getDomain, SiteSettings } from 'lib/settings';
import { cleanString } from 'lib/strings';
import { Statement } from 'lib/types';
import { GetStaticProps, NextPage } from 'next';
import router, { useRouter } from 'next/router';
import { createClient, languages, linkResolver } from 'prismicio';

import style from '../styles/page.module.scss';
interface Props {
  statement: Statement;
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
  const [queued, setQueued] = useState(false);
  const { uid, lang = 'ru', data } = statement;

  const title = asText(data?.title);
  const descr = data?.excerpt
    ? data?.excerpt
    : asText(data?.description)?.split('. ', 1)[0];

  const { asPath } = useRouter();
  const URL = `${getDomain()}${asPath}`;
  const socialUrl = `${getDomain()}/api/social/${lang}/${uid}`;

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
      <SEO
        title={cleanString(title)}
        description={cleanString(descr)}
        url={URL}
        imageUrl={socialUrl}
        siteName={settings.title}
        locale={lang}
        pageType="article"
      >
        {statement.alternate_languages
          .filter((l) => l.lang === lang)
          .map((l) => (
            <link
              key={l.lang}
              rel="alternate"
              hrefLang={languages[l.lang as keyof typeof languages]}
              href={`${getDomain()}/${linkResolver(l)}`}
            />
          ))}
      </SEO>

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
