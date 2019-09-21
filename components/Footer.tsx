import * as React from 'react';
import styled from 'styled-components';

const Footer: React.FunctionComponent = ({ children }) => (
  <Wrapper>
    {children}
  </Wrapper>
);

export default Footer;

const Wrapper = styled.footer`
  flex: 0;
  height: 2em;
  min-height: 2em;
  line-height: 2em;
  display: flex;
  flex-flow: row nowrap;
`;
