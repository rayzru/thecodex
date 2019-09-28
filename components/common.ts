import styled from 'styled-components';

export const Statement = styled.article`
  flex: 1;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  display: flex;
`;

export const Title = styled.h1`
  font-size: 10vw;
  font-weight: 600;
  color: #eee;
  font-family: 'Oswald';
  text-align: center;
  margin: 0 auto;
  width: 80%;
  text-shadow: -1px -1px 1px rgba(0,0,0,.3);
  transition: .5s all;
  &:hover { color: #fff; }
`;

export const Description = styled.div`
  margin-top: 3em;
  font-size: 1.1vw;
  line-height: 1.4em;
  width: 80%;
  color: #eee;
  font-family: 'Montserrat', sans-serif;
  text-shadow: -1px -1px 1px rgba(0,0,0,.3);

  a {
    color: #cdf;
  }
`;

export const StyledLink = styled.a`
  text-decoration: none;
  width: 100%;
`;
