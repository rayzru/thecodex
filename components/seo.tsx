import { PropsWithChildren } from 'react';
import { ogImageConfig } from 'lib/settings';
import Head from 'next/head';

type PagetType = 'website' | 'article';

interface Props {
  title?: string;
  description?: string;
  url?: string;
  imageUrl?: string;
  siteName?: string;
  locale?: string;
  pageType?: PagetType;
}

const SEO: React.FC<PropsWithChildren<Props>> = ({
  title,
  pageType = 'website',
  siteName,
  description,
  url,
  imageUrl,
  locale,
  children,
}) => {
  const { type, width, height } = ogImageConfig;
  return (
    <>
      <Head>
        <meta name="robots" content="index, nofollow" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        />

        <meta name="twitter:creator" content="@rayz61" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:type" content={pageType} />
        <meta property="og:url" content={url} />

        {locale && (
          <>
            <meta http-equiv="Content-Language" lang={locale} />
            <meta property="og:locale" content={locale} />
          </>
        )}

        {siteName && <meta property="og:site_name" content={siteName} />}

        {title && (
          <>
            <title>{title}</title>
            <meta property="og:title" content={title} />
            <meta name="twitter:title" content={title} />
          </>
        )}

        {description && (
          <>
            <meta name="description" content={description} />
            <meta name="twitter:description" content={description} />
          </>
        )}

        {imageUrl && (
          <>
            <meta name="twitter:image" content={imageUrl} />
            <meta property="og:image" content={imageUrl} />
            <meta property="og:image:type" content={`image/${type}`} />
            <meta property="og:image:width" content={width?.toString()} />
            <meta property="og:image:height" content={height?.toString()} />
          </>
        )}

        {children}
      </Head>
    </>
  );
};

export default SEO;
