import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface Props {
  title: string;
}

const Header: React.FunctionComponent<Props> = ({ title }) => {
  const { pathname } = useRouter();
  const dotTitle = title.split(' ').join(String.fromCharCode(183));

  return (
    <Wrapper>
      {pathname === '/' ? (
        <Logo>{dotTitle}</Logo>
      ) : (
        <Link href={'/'} passHref>
          <StyledLink>
            <Logo>{dotTitle}</Logo>
          </StyledLink>
        </Link>
      )}
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.header`
  flex: 0;
  display: flex;
  flex-flow: row nowrap;
`;

const Logo = styled.div`
  flex: 1;
  margin: 2em auto;
  text-align: center;
  text-transform: uppercase;
  font-family: 'Oswald', sans-serif;
  font-size: 20px;
  font-weight: 400;
  white-space: nowrap;
  color: #eeeeee50;
  transition: color 0.2s ease;
`;

export const StyledLink = styled.a`
  text-decoration: none;
  text-align: center;
  width: 100%;
  &:hover > div {
    color: #fff;
  }
`;
