import styled from 'styled-components';

export const Statement = styled.article`
  flex: 1;
  align-items: center;
  justify-content: center;
  display: flex;
`;

export const Title = styled.h1`
  font-size: 10vw;
  font-weight: 500;
  color: #eee;
  font-family: 'Oswald';
  text-align: center;
  width: 100%;
  text-shadow: -1px -1px 1px rgba(0,0,0,.3);
  transition: .5s all;
  &:hover { color: #fff; }
`;

export const Description = styled.div`

`;

export const StyledLink = styled.a`
  text-decoration: none;
`;
