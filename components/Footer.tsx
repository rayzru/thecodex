import { PropsWithChildren } from 'react';

import style from '../styles/footer.module.scss';

// eslint-disable-next-line @typescript-eslint/ban-types
const Footer: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <footer className={style.wrapper}>
      {children}
      <div className={style.credentials}>
        <a
          className={style.link}
          target={'_blank'}
          href="https://andrew.rumm.im"
          rel="noreferrer"
        >
          Andrew Rumm
        </a>
        <a
          className={style.link}
          target={'_blank'}
          href="https://t.me/rayzru"
          rel="noreferrer"
        >
          Telegram
        </a>
        <a
          className={style.link}
          target={'_blank'}
          href="https://github.com/rayzru"
          rel="noreferrer"
        >
          Github
        </a>
      </div>
    </footer>
  );
};

export default Footer;
