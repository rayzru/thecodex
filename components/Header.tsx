import styled from '@emotion/styled';
import { useRouter } from 'next/router';

import Link from './Link';

interface Props {
  title: string;
}

const Header: React.FunctionComponent<Props> = ({ title }) => {
  const { pathname } = useRouter();
  const dotTitle = title.split(' ').join(String.fromCharCode(183));

  return (
    <Logo href={'/'} disabled={pathname === '/'}>
      {dotTitle}
    </Logo>
  );
};

export default Header;

const Logo = styled(Link)`
  margin: 52px 0 44px;
  text-transform: uppercase;
  font-family: 'Oswald', sans-serif;
  font-size: 20px;
  font-weight: 400;
  white-space: nowrap;
  color: #eeeeee50;
  transition: color 0.2s ease;
  &:hover {
    text-decoration: none;
  }
`;
