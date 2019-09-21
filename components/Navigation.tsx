import * as React from 'react';
import styled from 'styled-components';
import { Languages } from '../api/prismicClient';

interface Props {
  locale?: Languages;
}

const Navigation: React.FunctionComponent<Props> = ({ }) => (
  <Wrapper>

  </Wrapper>
);

export default Navigation;

const Wrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
`;
