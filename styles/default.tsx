import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  html, body, #__next {
    height: 100hv;
  }
  body {
    font-family: 'Montserrat', sans-serif;
    background-color: #8091a5;
  }
  h1, h2, h3, h4, h5 { font-family: 'Oswald', sans-serif; }

  .layoutWrapper {
    transition: background-image 1s ease-in-out;
  }
`;
