import {
  createClient as prismicCreateClient,
  getRepositoryName,
} from '@prismicio/client';
import { CreateClientConfig, enableAutoPreviews } from '@prismicio/next';
import { AlternateLanguage, PrismicDocument } from '@prismicio/types';

import sm from './sm.json';

export const repositoryName = getRepositoryName(sm.apiEndpoint);

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
  const client = prismicCreateClient(sm.apiEndpoint);

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
