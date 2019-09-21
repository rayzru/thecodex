import * as React from 'react';
import styled from 'styled-components';
import Footer from './Footer';
import Header from './Header';

interface Props {
  title?: string;
}

const Layout: React.FunctionComponent<Props> = ({ children }) => (
  <Wrapper>
    <Header />
    {children}
    <Footer />
  </Wrapper>
);

export default Layout;

const Wrapper = styled.div`
  height: 100vh;
  background-color: #8091a5;
  display: flex;
  flex-flow: column nowrap;
`;
