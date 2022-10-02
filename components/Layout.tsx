import { PropsWithChildren } from 'react';

import style from '../styles/layout.module.scss';

// eslint-disable-next-line @typescript-eslint/ban-types
const Layout: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  return <div className={style.wrapper}>{children}</div>;
};

export default Layout;
