import Link from 'next/link';
import Router from 'next/router';
import * as React from 'react';
import styled from 'styled-components';
import { StyledLink } from './common';

const isHomePage = () => {
  console.log('PATHNAME', Router.query);
  const { slug } = Router.query;
  return !(slug && slug.length);
};

const LogoBlock: React.FunctionComponent = () => (
  <Logo>thecodex</Logo>
);

const Header: React.FunctionComponent = () => (
  <Wrapper>
    {isHomePage()
      ? <LogoBlock />
      : (
        <Link href={'/'} as={'/'} passHref>
          <StyledLink>
            <LogoBlock />
          </StyledLink>
        </Link>)
    }
    <Menu></Menu>
  </Wrapper>
);

export default Header;

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
  flex: 0;
`;
