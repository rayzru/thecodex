import { PropsWithChildren } from 'react';
import { useRouter } from 'next/router';

import Link from './Link';

import style from '../styles/header.module.scss';

interface Props {
  title: string;
  showLocales?: boolean;
  lang?: string;
}

const Header: React.FunctionComponent<PropsWithChildren<Props>> = ({
  title,
  children,
}) => {
  const { pathname } = useRouter();
  const dotTitle = title.split(' ').join(String.fromCharCode(183));

  return (
    <div className={style.wrapper}>
      <Link className={style.logo} href={'/'} disabled={pathname === '/'}>
        {dotTitle}
      </Link>
      {children}
    </div>
  );
};

export default Header;
