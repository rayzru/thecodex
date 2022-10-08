import { NextApiOgImageConfig } from 'next-api-og-image';

export enum Locale {
  RU = 'ru',
  EN = 'en-us',
}

export type LocaleType = Locale.RU | Locale.EN;

export interface SiteSettings {
  title: string;
  description: string;
  locale?: string;
}

enum Params {
  'lang',
  'id',
}

export type OGOptions = Omit<
  NextApiOgImageConfig<'query', keyof typeof Params>,
  'template'
>;

export const ogImageConfig: OGOptions = {
  // type: 'jpeg',
  // quality: 80,
  type: 'png',
  width: 600 * 2,
  height: 315 * 2,
  cacheControl: 'public, max-age=604800, immutable',
  dev: {
    inspectHtml: false,
  },
};

export const getDomain = () =>
  typeof window !== 'undefined' && window.location.origin
    ? window.location.origin
    : '';
