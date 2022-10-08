import { PropsWithChildren } from 'react';
import { ogImageConfig } from 'lib/settings';
import Head from 'next/head';

interface Props {
  title: string;
  description: string;
  url: string;
  imageUrl: string;
  siteName: string;
}

const SEO: React.FC<PropsWithChildren<Props>> = ({
  title,
  siteName,
  description,
  url,
  imageUrl,
  children,
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index, nofollow" />

        <meta property="og:site_name" content={siteName} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={imageUrl} />
        <meta
          property="og:image:type"
          content={`image/${ogImageConfig.type}`}
        />
        <meta
          property="og:image:width"
          content={ogImageConfig.width?.toString()}
        />
        <meta
          property="og:image:height"
          content={ogImageConfig.height?.toString()}
        />

        <meta name="twitter:creator" content="@rayz61" />

        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />

        <meta name="twitter:image" content={imageUrl} />
        <meta name="twitter:card" content="summary_large_image" />

        {children}
      </Head>
    </>
  );
};

export default SEO;
