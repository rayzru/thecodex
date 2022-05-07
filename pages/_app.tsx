import React from 'react';
import { EmotionCache } from '@emotion/cache';
import { CacheProvider, Global } from '@emotion/react';
import { PrismicPreview } from '@prismicio/next';
import { PrismicProvider } from '@prismicio/react';
import createEmotionCache from 'createEmotionCache';
import { AppProps } from 'next/app';
import Link from 'next/link';
import { linkResolver, repositoryName } from 'prismicio';

import Default from '../styles/default';
// import Reset from '../styles/reset';

const clientSideEmotionCache = createEmotionCache();

interface EmotionAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const App = ({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: EmotionAppProps) => {
  return (
    <CacheProvider value={emotionCache}>
      <Global styles={Default} />
      <PrismicProvider
        linkResolver={linkResolver}
        internalLinkComponent={({ href, children, ...props }) => (
          <Link href={href}>
            <a {...props}>{children}</a>
          </Link>
        )}
      >
        <PrismicPreview repositoryName={repositoryName}>
          <Component {...pageProps} />
        </PrismicPreview>
      </PrismicProvider>
    </CacheProvider>
  );
};

export default App;
