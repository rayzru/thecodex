import * as React from 'react';
import styled from 'styled-components';
import { Languages } from '../api/prismicClient';
import { darken, randomColor } from '../lib/helpers';
import Footer from './Footer';
import Header from './Header';

interface Props {
  locale?: Languages;
}

const Layout: React.FunctionComponent<Props> = ({ locale, children }) => (
  <Wrapper color={randomColor()} className='layoutWrapper'>
    <Header locale={locale} />
    {children}
    <Footer />
  </Wrapper>
);

export default Layout;

const Wrapper = styled.div`
  height: 100vh;
  background-image: radial-gradient(${props => props.color}, ${props => darken(props.color)});
  background-size: 110% 110%;
  display: flex;
  flex-flow: column nowrap;
`;
