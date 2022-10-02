import ImageTemplate, { ImageTemplateProps } from 'components/ImageTemplate';
import { getFontEmbedCSS, toPng } from 'html-to-image';
import { css2style } from './styles';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import { createElement } from 'react';

export const DEFAULT_IMAGE =
  'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';

export const downloadImage = (dataUrl: string, imageName = 'download') => {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = `${imageName}.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const getImage = async (
  { settings }: ImageTemplateProps,
  element: HTMLElement | null
) => {
  if (element === null) {
    return null;
  }

  const fontEmbedCSS = await getFontEmbedCSS(element);
  const output = document.createElement('div');
  const cred = document.createElement('footer');
  const credLink = document.createElement('a');
  const credName = document.createElement('div');
  const dotTitle = (settings?.title || '')
    .split(' ')
    .join(String.fromCharCode(183));
  credName.innerHTML = dotTitle;
  credLink.innerHTML = 'thecodex.ru';

  const embedCSS = document.createElement('style');

  const containerStyles: React.CSSProperties = {
    backgroundColor: '#8091a5',
    background: 'linear-gradient(132deg, #8091a5, #3d4a59)',
    color: 'white',
    fontSize: '16px',
    flexFlow: 'column',
    display: 'flex',
    height: '400px',
    justifyItems: 'center',
    fontFamily: 'Montserrat',
    padding: '30px',
    borderRadius: '30px 50px 30px 0',
  };

  const articleStyles: React.CSSProperties = {
    justifyContent: 'center',
    height: '',
  };

  const h1Styles: React.CSSProperties = {
    fontFamily: 'Oswald',
    fontSize: '40px',
  };

  const footerStyles: React.CSSProperties = {
    textTransform: 'uppercase',
    fontSize: '15px',
    display: 'flex',
    flexDirection: 'row',
    justifySelf: 'flex-end',
    marginTop: 'auto',
    justifyContent: 'space-between',
  };

  const linkStyles: React.CSSProperties = {
    textDecoration: 'underline',
  };

  embedCSS.innerHTML = `
    main { ${css2style(containerStyles)}}
    h1 {  ${css2style(h1Styles)} }
    footer { ${css2style(footerStyles)} }
    a { ${css2style(linkStyles)} }
  `;

  cred.append(credName);
  cred.append(credLink);
  output.append(embedCSS);
  output.append(element);
  element.append(cred);

  return toPng(output, {
    width: 500,
    height: 500,
    pixelRatio: 2,
    fontEmbedCSS,
  });
};
