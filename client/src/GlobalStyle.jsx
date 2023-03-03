import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap");
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
`;

export default GlobalStyle;
