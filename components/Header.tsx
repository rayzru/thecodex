import { useRouter } from 'next/router';

import Link from './Link';

import style from '../styles/header.module.scss';

interface Props {
  title: string;
}

const Header: React.FunctionComponent<Props> = ({ title }) => {
  const { pathname } = useRouter();
  const dotTitle = title.split(' ').join(String.fromCharCode(183));

  return (
    <Link className={style.logo} href={'/'} disabled={pathname === '/'}>
      {dotTitle}
    </Link>
  );
};

export default Header;
