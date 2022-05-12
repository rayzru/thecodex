import { pSBC } from './pSBC';

export const darken = (color: string) => pSBC(-0.3, color);

export const colors = ['#8091a5'];
// , '#DB6B88', '#B9789F'

export const randomColor = () =>
  colors[Math.floor(Math.random() * colors.length)];
