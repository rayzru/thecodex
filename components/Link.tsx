import { FC, PropsWithChildren } from 'react';
import NextLink from 'next/link';

import style from '../styles/link.module.scss';

interface LinkProps {
  disabled?: boolean;
  href: string;
  locale?: string;
  className?: string;
}
// eslint-disable-next-line @typescript-eslint/ban-types
const Link: FC<PropsWithChildren<LinkProps>> = ({
  children,
  href,
  locale,
  disabled = false,
  className = '',
  ...rest
}) => {
  return disabled ? (
    <a className={`${className ? className : ''} ${style.disabled}`} {...rest}>
      {children}
    </a>
  ) : (
    <NextLink href={href} passHref={true} locale={locale}>
      <a className={`${className ? className : ''} ${style.link}`} {...rest}>
        {children}
      </a>
    </NextLink>
  );
};

export default Link;
