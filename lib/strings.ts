export const Locales = ['ru', 'en-us'];

export const cleanString = (str: unknown) =>
  str && typeof str === 'string' ? str.replace(/[\n\r\t\s]+/g, ' ') : '';

export const randomString = (length = 5) =>
  Array(length)
    .fill(0)
    .map(() => 'abcdefghijklmnopqrstuvwxyz'.charAt(Math.random() * 62))
    .join('');
