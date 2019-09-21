import Link from 'next/link';
import * as React from 'react';
import styled from 'styled-components';

const Header: React.FunctionComponent = ({ children }) => (
  <Wrapper>
    {children}
    <Link href='/'>
      <Logo>thecodex</Logo>
    </Link>
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

const Logo = styled.a`
  flex: 0;
  margin-left: 20px;
  font-family: 'Oswald', sans-serif;
  font-size: 30px;
  font-weight: 400;
  cursor: pointer;
  color: #fff;
`;

const Menu = styled.div`
  flex: 0;
`;
