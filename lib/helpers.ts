import pSBC from 'shade-blend-color';
import { Languages } from '../api/prismicClient';

export const getProjectTitle = (locale) => locale === Languages.en ? 'The Codex' : 'Это Кодекс';

export const darken = (color: string) => pSBC(-.3, color);

export const colors = ['#8091a5'];
// , '#DB6B88', '#B9789F'

export const randomColor = () => colors[Math.floor((Math.random() * colors.length))];
