import { WithRouterProps } from 'next/dist/client/with-router';
import Link from 'next/link';
import { withRouter } from 'next/router';
import * as React from 'react';
import styled from 'styled-components';
import { Languages } from '../api/prismicClient';
import { StyledLink } from './common';
import LanguageSwitcher from './LanguageSwitcher';

interface LogoBlockProps {
  locale?: Languages;
}
const LogoBlock: React.FunctionComponent<LogoBlockProps> = ({ locale = Languages.en }) => (
  <Logo>
    {locale === Languages.en ? 'the.codex' : ''}
    {locale === Languages.ru ? 'это.кодекс' : ''}
  </Logo>
);

interface WithLocaleProp extends WithRouterProps {
  locale?: Languages;
}

const Header: React.FunctionComponent<WithLocaleProp> = ({ locale, router: { pathname, query: { slug } } }) => (
  <Wrapper>
    {!slug && pathname === '/'
      ? <LogoBlock locale={locale} />
      : (
        <Link href={`/index?locale=${locale}`} as={`/${locale}`} passHref>
          <StyledLink>
            <LogoBlock locale={locale} />
          </StyledLink>
        </Link>)
    }
    <Menu>
      <Link href={`/about?locale=${locale}`} as={`/${locale}/about`} passHref>
        <MenuItem className={pathname.includes('/about') ? 'active' : 'inactive'}>?</MenuItem>
      </Link>
    </Menu>
    <LanguageSwitcher locale={locale}></LanguageSwitcher>
  </Wrapper>
);

export default withRouter(Header);

const Wrapper = styled.header`
  flex: 0;
  height: 50px;
  min-height: 50px;
  line-height: 50px;
  display: flex;
  flex-flow: row nowrap;
`;

const Logo = styled.div`
  flex: 0;
  margin-left: 20px;
  text-transform: uppercase;
  // letter-spacing: .4em;
  font-family: 'Oswald', sans-serif;
  font-size: 20px;
  font-weight: 400;
  color: #eee;
  transition: 1s all;
  &:hover {
    color: #fff;
  }
`;

const Menu = styled.div`
  flex: 1;
  margin-left: 20px;
  margin-right: 0px;
`;

const MenuItem = styled.a`
  flex: 1;
  display: block;
  color: #ccc;
  text-align: center;
  text-decoration: none;
  width: 30px;
  height: 30px;
  line-height: 30px;
  font-family: 'Oswald', sans-serif;
  margin: 10px;
  margin-left: 0;
  border: 1px solid transparent;
  border-radius: 50%;
  transition: .5s all;
  &:hover {
    border-color: #fff;
    color: #fff;
  }
  &.active {
    border-color: #fff;
    color: #fff;
    cursor: pointer;
  }
  &.inactive {
    opacity: .4;
    cursor: normal;
    &:hover {
      opacity: 1;
      border-color: rgba(255,255,255,.1);
    }
  }
`;
