import {
  createClient as prismicCreateClient,
  getRepositoryName,
} from '@prismicio/client';
import { CreateClientConfig, enableAutoPreviews } from '@prismicio/next';
import { AlternateLanguage, PrismicDocument } from '@prismicio/types';

export const apiEndpoint = 'https://thecodex.prismic.io/api/v2';

export const repositoryName = getRepositoryName(apiEndpoint);

export const linkResolver = (
  doc?: Pick<PrismicDocument | AlternateLanguage, 'type' | 'lang' | 'uid'>
) => {
  if (doc) {
    if (doc.type === 'statement') {
      return doc.uid ? `/${doc.uid}` : '/';
    }
  }

  return '/';
};

export const createClient = (config: CreateClientConfig = {}) => {
  const client = prismicCreateClient(apiEndpoint);

  enableAutoPreviews({
    client,
    previewData: config.previewData,
    req: config.req,
  });

  return client;
};

export const languages = {
  'en-us': 'English',
  ru: 'Русский',
};
