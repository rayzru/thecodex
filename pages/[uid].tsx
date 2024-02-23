import React, { useEffect, useRef, useState } from 'react';
import * as prismic from '@prismicio/client';
import { asText } from '@prismicio/helpers';
import { PrismicRichText } from '@prismicio/react';
import Footer from 'components/Footer';
import Header from 'components/Header';
import Heading from 'components/Heading';
import Layout from 'components/Layout';
import Link from 'components/Link';
import SEO from 'components/seo';
import Share from 'components/Share';
import { getDomain, getSettings, SiteSettings } from 'lib/settings';
import { cleanString } from 'lib/strings';
import { Locale, Statement } from 'lib/types';
import { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
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
  const refPrev = useRef<HTMLAnchorElement>(null);
  const refNext = useRef<HTMLAnchorElement>(null);
  const descr = data?.excerpt
    ? data?.excerpt
    : asText(data?.description)?.split('. ', 1)[0];

  const { asPath, events } = useRouter();
  const URL = `${getDomain()}${asPath}`;
  const socialUrl = `${getDomain()}/api/social/${lang}/${uid}`;

  useEffect(() => {
    let swipeStartX = 0;
    let swipeStartY = 0;

    const onSwipeStart = (e: TouchEvent) => {
      if (queued) return;
      swipeStartX = e.changedTouches[0].screenX;
      swipeStartY = e.changedTouches[0].screenY;
    };

    function onSwipeEnd(e: TouchEvent) {
      if (queued) return;

      const swipeXDelta = swipeStartX
        ? swipeStartX - e.changedTouches[0].screenX
        : 0;

      const swipeYDelta = swipeStartY
        ? swipeStartY - e.changedTouches[0].screenY
        : 0;

      if (
        swipeXDelta > swipeYDelta &&
        prevLink !== '/' &&
        refPrev.current &&
        refNext.current
      ) {
        if (swipeXDelta < -130) {
          refPrev.current.focus();
          refPrev.current.click();
        }
        if (swipeXDelta > 130) {
          refNext.current.focus();
          refNext.current.click();
        }
      }
    }

    function onKeyDown(e: KeyboardEvent) {
      if (queued) return;

      if (e.key === 'ArrowLeft' && prevLink !== '/' && refPrev.current) {
        refPrev.current.focus();
        refPrev.current.click();
      }

      if (e.key === 'ArrowRight' && nextLink !== '/' && refNext.current) {
        refNext.current.focus();
        refNext.current.click();
      }
    }

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('touchstart', onSwipeStart);
    document.addEventListener('touchend', onSwipeEnd);
    events.on('routeChangeComplete', () => setQueued(false));

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('touchstart', onSwipeStart);
      document.removeEventListener('touchend', onSwipeEnd);
    };
  }, [nextLink, prevLink, events, queued]);

  const handleNextClick = () => {
    setQueued(true);
  };
  const handlePrevClick = () => {
    setQueued(true);
  };

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

      <Header title={settings.title || ''} showLocales />

      <main className={style.page}>
        <article className={style.description}>
          <Heading headingLevel="h1" className={style.title}>
            {title}
          </Heading>
          <PrismicRichText field={ statement?.data?.description ?? [] } />
        </article>
      </main>
      <Footer>
        <nav className={style.nav_row}>
          <Share
            locale={settings.locale}
            className={style.locale}
            url={URL}
            message={settings.copySuccess as string}
          >
            {settings.copyLabel}
          </Share>
          {statement?.alternate_languages?.length > 0 &&
            statement.alternate_languages.map((l) => (
              <Link key={l.uid} href={linkResolver(l)} locale={l.lang}>
                {l.lang === 'en-us' ? languages['en-us'] : languages['ru']}
              </Link>
            ))}
        </nav>
        <nav className={style.nav_row}>
          <Link
            className={style.arrow_link}
            href={prevLink}
            onClick={handlePrevClick}
            elRef={refPrev}
            disabled={prevLink === '/' || queued}
          >
            {String.fromCharCode(8592)}
          </Link>

          <Link
            className={style.arrow_link}
            onClick={handleNextClick}
            href={nextLink}
            elRef={refNext}
            disabled={nextLink === '/' || queued}
          >
            {String.fromCharCode(8594)}
          </Link>

          {queued && (
            <div className="spinnerWrapper">
              <svg className="spinner" viewBox="0 0 50 50">
                <circle
                  className="path"
                  cx="25"
                  cy="25"
                  r="20"
                  fill="none"
                  strokeWidth="5"
                />
              </svg>
            </div>
          )}
        </nav>
      </Footer>
    </Layout>
  );
};

export default Statement;

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const client = createClient();

  const settings = await getSettings(locale as Locale, client);

  const opts = { lang: locale };
  const uid = params?.uid?.toString() || '';
  const statement = await client.getByUID('statement', uid, opts);

  const nextOpts: Partial<prismic.BuildQueryURLArgs> = {
    lang: locale,
    predicates: [prismic.predicate.at('document.type', 'statement')],
    after: statement.id,
    orderings: [
      {
        field: 'document.first_publication_date',
        direction: 'asc',
      },
    ],
  };

  const prevOpts: Partial<prismic.BuildQueryURLArgs> = {
    lang: locale,
    predicates: [prismic.predicate.at('document.type', 'statement')],
    after: statement.id,
    orderings: [
      {
        field: 'document.first_publication_date',
        direction: 'desc',
      },
    ],
  };

  let nextStatement, prevStatement;

  try {
    nextStatement = await client.getFirst(nextOpts);
    // eslint-disable-next-line no-empty
  } catch (err) {}

  try {
    prevStatement = await client.getFirst(prevOpts);
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
