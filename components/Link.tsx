import { FC, MouseEvent, MutableRefObject, PropsWithChildren } from 'react';
import { clsx } from 'clsx';
import NextLink from 'next/link';

import style from '../styles/link.module.scss';

interface LinkProps {
  disabled?: boolean;
  href: string;
  locale?: string;
  className?: string;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
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
  return disabled && !href ? (
    <span
      className={ clsx(className, style.disabled) }
      { ...rest }
    >
      {children}
    </span>
  ) : (
      <NextLink
        href={ href }
        locale={ locale }
        onClick={ (e) => onClick && onClick(e) }
        ref={ elRef }
        className={ clsx(className, style.link) }
        { ...rest }
      >
        { children }
    </NextLink>
  );
};

export default Link;
