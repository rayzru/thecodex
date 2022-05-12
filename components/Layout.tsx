import { PropsWithChildren } from 'react';
import styled from '@emotion/styled';

// eslint-disable-next-line @typescript-eslint/ban-types
const Layout: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  min-height: 100vh;
`;

export default Layout;
