import { PropsWithChildren } from 'react';
import styled from '@emotion/styled';

// eslint-disable-next-line @typescript-eslint/ban-types
const Footer: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <Wrapper>
      {children}
      <Credentials>
        <Text>Andrew Rumm</Text>
        <StyledLink target={'_blank'} href="https://t.me/rayzru">
          Telegram
        </StyledLink>
        <StyledLink target={'_blank'} href="https://github.com/rayzru">
          Github
        </StyledLink>
      </Credentials>
    </Wrapper>
  );
};

const Text = styled.span`
  text-transform: uppercase;
  color: #eeeeee55;
`;

const Wrapper = styled.footer`
  margin-top: auto;
  margin-bottom: 1em;
  font-size: 10px;
`;

const StyledLink = styled.a`
  text-decoration: none;
  text-transform: uppercase;
  color: #eeeeee55;
  &:hover {
    color: #eeeeeeff;
    text-decoration: underline;
  }
`;

const Credentials = styled.div`
  display: flex;
  flex-flow: row nowrap;
  column-gap: 36px;
  margin: 7em 0 2em;
`;
export default Footer;
