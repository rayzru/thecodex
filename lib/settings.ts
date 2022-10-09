import { Client } from '@prismicio/client';
import { asText } from '@prismicio/helpers';
import { NextApiOgImageConfig } from 'next-api-og-image';

import { Locale } from './types';

const chromiumOptions = [
  '--autoplay-policy=user-gesture-required',
  '--disable-background-networking',
  '--disable-background-timer-throttling',
  '--disable-backgrounding-occluded-windows',
  '--disable-breakpad',
  '--disable-browser-side-navigation',
  '--disable-client-side-phishing-detection',
  '--disable-component-update',
  '--disable-default-apps',
  '--disable-dev-shm-usage',
  '--disable-domain-reliability',
  '--disable-extensions',
  '--disable-features=AudioServiceOutOfProcess',
  '--disable-gpu',
  '--disable-hang-monitor',
  '--disable-mobile-emulation',
  '--disable-ipc-flooding-protection',
  '--disable-notifications',
  '--disable-offer-store-unmasked-wallet-cards',
  '--disable-popup-blocking',
  '--disable-print-preview',
  '--disable-prompt-on-repost',
  '--disable-renderer-backgrounding',
  '--disable-setuid-sandbox',
  '--disable-speech-api',
  '--disable-sync',
  '--hide-scrollbars',
  '--ignore-gpu-blacklist',
  '--metrics-recording-only',
  '--mute-audio',
  '--no-default-browser-check',
  '--no-first-run',
  '--no-pings',
  '--no-sandbox',
  '--no-zygote',
  '--password-store=basic',
  '--use-gl=swiftshader',
  '--use-mock-keychain',
  '--lang=en',
];

export interface SiteSettings {
  title?: string;
  description?: string;
  copyLabel?: string;
  copySuccess?: string;
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
  type: 'jpeg',
  chrome: { args: chromiumOptions },
  quality: 60,
  width: 1200,
  height: 630,
  cacheControl: 'public, max-age=604800, immutable',
  dev: {
    inspectHtml: false,
  },
};

export const getDomain = () =>
  typeof window !== 'undefined' && window.location.origin
    ? window.location.origin
    : '';

export const getSettings = async (
  locale: Locale,
  client: Client
): Promise<SiteSettings> => {
  const settingsData = await client.getSingle('settings', { lang: locale });
  return {
    title: asText(settingsData.data.title) || 'The Codex',
    description: asText(settingsData.data.description) || '',
    copyLabel: settingsData.data.copytoclipboard || '',
    copySuccess: settingsData.data.successfullycopied || '',
    locale,
  };
};
