import { FC, PropsWithChildren } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import NextLink from 'next/link';

interface LinkProps {
  disabled?: boolean;
  href: string;
  locale?: string;
}
// eslint-disable-next-line @typescript-eslint/ban-types
const Link: FC<PropsWithChildren<LinkProps>> = ({
  children,
  href,
  locale,
  disabled = false,

  ...rest
}) => {
  return disabled ? (
    <StyledDisabledLink {...rest}>{children}</StyledDisabledLink>
  ) : (
    <NextLink href={href} passHref={true} locale={locale}>
      <StyledLink {...rest}>{children}</StyledLink>
    </NextLink>
  );
};

const LinkCss = css`
  text-decoration: none;
  text-transform: uppercase;
  color: #eeeeee55;
  font-size: 10px;
  transition: all 0.5s ease;
`;

const StyledLink = styled.a`
  ${LinkCss}
  &:hover {
    color: #eeeeeeff;
    text-decoration: underline;
  }
`;

const StyledDisabledLink = styled.a`
  ${LinkCss}
  color: #eeeeee33;
`;

export default Link;
