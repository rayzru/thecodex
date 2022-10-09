import React from 'react';
import { PrismicProvider } from '@prismicio/react';
import { AppProps } from 'next/app';
import Link from 'next/link';
import { linkResolver } from 'prismicio';

import '../styles/fonts.scss';
import '../styles/defaults.scss';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <PrismicProvider
      linkResolver={linkResolver}
      internalLinkComponent={({ href, ...props }) => (
        <Link href={href}>
          <a {...props} />
        </Link>
      )}
    >
      <Component {...pageProps} />
    </PrismicProvider>
  );
};

export default App;
