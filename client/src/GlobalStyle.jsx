import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

* {
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 400;
}

  body {
    box-sizing: border-box;
    margin: 0;
  }

  h1, h2, h3, h4, h5, h6, span, p {
    margin: 0;
  }

  a {
    color: #000;
    text-decoration: none;
  }


`;

export default GlobalStyle;
