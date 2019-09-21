import { Languages } from 'api/prismicClient';
import { WithRouterProps } from 'next/dist/client/with-router';
import Link from 'next/link';
import { withRouter } from 'next/router';
import * as React from 'react';
import styled from 'styled-components';
import { StyledLink } from './common';
import LanguageSwitcher from './LanguageSwitcher';

const LogoBlock: React.FunctionComponent = () => (
  <Logo>thecodex</Logo>
);

interface WithLocaleProp extends WithRouterProps {
  locale?: Languages;
}

const Header: React.FunctionComponent<WithLocaleProp> = ({ locale, router: { query: { slug } } }) => (
  <Wrapper>
    {!slug
      ? <LogoBlock />
      : (
        <Link href={'/'} as={'/'} passHref>
          <StyledLink>
            <LogoBlock />
          </StyledLink>
        </Link>)
    }
    <Menu></Menu>
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
  font-family: 'Oswald', sans-serif;
  font-size: 30px;
  font-weight: 400;
  color: #fff;
`;

const Menu = styled.div`
  flex: 1;
  margin-left: 20px;
  margin-right: 20px;
`;
