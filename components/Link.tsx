import { FC, MutableRefObject, PropsWithChildren } from 'react';
import NextLink from 'next/link';

import style from '../styles/link.module.scss';

interface LinkProps {
  disabled?: boolean;
  href: string;
  locale?: string;
  className?: string;
  onClick?: () => void;
  elRef?: MutableRefObject<HTMLAnchorElement | null>;
}

const Link: FC<PropsWithChildren<LinkProps>> = ({
  children,
  href,
  locale,
  disabled = false,
  onClick,
  elRef,
  className = '',
  ...rest
}) => {
  return disabled ? (
    <a className={`${className ? className : ''} ${style.disabled}`} {...rest}>
      {children}
    </a>
  ) : (
    <NextLink href={href} passHref={true} locale={locale}>
      <a
        onClick={() => onClick && onClick()}
        ref={elRef}
        className={`${className ? className : ''} ${style.link}`}
        {...rest}
      >
        {children}
      </a>
    </NextLink>
  );
};

export default Link;
