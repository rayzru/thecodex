import React from 'react';
import { PrismicPreview } from '@prismicio/next';
import { PrismicProvider } from '@prismicio/react';
import { AppProps } from 'next/app';
import Link from 'next/link';
import { linkResolver, repositoryName } from 'prismicio';

import '../styles/fonts.scss';
import '../styles/defaults.scss';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <PrismicProvider
      linkResolver={linkResolver}
      internalLinkComponent={({ href, children, ...props }) => (
        <Link href={href}>
          <a {...props}>{children}</a>
        </Link>
      )}
    >
      {process?.env.NODE_ENV === 'development' && (
        <PrismicPreview repositoryName={repositoryName}>
          <Component {...pageProps} />
        </PrismicPreview>
      )}
    </PrismicProvider>
  );
};

export default App;
