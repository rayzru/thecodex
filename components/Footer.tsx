import { PropsWithChildren } from 'react';
import Link from 'next/link';

import style from '../styles/footer.module.scss';

// eslint-disable-next-line @typescript-eslint/ban-types
const Footer: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <footer className={style.wrapper}>
      {children}
      <div className={style.credentials}>
        <Link 
          className={style.link}
          target={'_blank'}
          href="https://andrew.rumm.im"
          rel="noreferrer"
        >
          Andrew Rumm
        </Link>
        <Link 
          className={style.link}
          target={'_blank'}
          href="https://t.me/rayzru"
          rel="noreferrer"
        >
          Telegram
        </Link>
        <Link 
          className={style.link}
          target={'_blank'}
          href="https://github.com/rayzru"
          rel="noreferrer"
        >
          Github
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
