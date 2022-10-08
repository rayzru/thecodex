export const Locales = ['ru', 'en-us'];

export const cleanString = (str: unknown) =>
  str && typeof str === 'string' ? str.replace(/[\n\r\t\s]+/g, ' ') : '';
