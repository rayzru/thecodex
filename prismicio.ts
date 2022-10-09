import {
  createClient as prismicCreateClient,
  getRepositoryName,
} from '@prismicio/client';
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

export const createClient = () => prismicCreateClient(apiEndpoint);

export const languages = {
  'en-us': 'English',
  ru: 'Русский',
};
