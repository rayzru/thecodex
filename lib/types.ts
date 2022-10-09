import { PrismicDocumentWithUID, RichTextField } from '@prismicio/types';

interface StatementInterface {
  title: RichTextField;
  description: RichTextField;
  excerpt: string;
}

export interface Statement extends PrismicDocumentWithUID {
  data: StatementInterface;
}

export enum Locale {
  RU = 'ru',
  EN = 'en-us',
}

export type LocaleTypes = Locale.RU | Locale.EN;

export const Locales: Locale[] = [Locale.RU, Locale.EN];
