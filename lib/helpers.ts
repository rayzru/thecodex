import { Languages } from '../api/prismicClient';

export const getProjectTitle = (locale) => locale === Languages.en ? 'The Codex' : 'Это Кодэкс';
