export enum Locale {
  RU = 'ru',
  EN = 'en-us',
}

export type LocaleType = Locale.RU | Locale.EN;

export interface SiteSettings {
  title: string;
  locale?: string;
}
