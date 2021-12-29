import {createGlobalStyle} from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --bg-color: hsl(230deg, 33%, 21%);
    --text-color: hsl(230deg, 57%, 90%);

    --heading-color: hsl(60deg, 100%, 100%);
    --text-color: hsl(230deg, 57%, 90%);
    --dark-text-color: hsl(230deg, 39%, 12%);

    --button-text: hsl(230deg, 33%, 21%);
    --button-bg: hsl(351deg, 61%, 89%);

    --page-padding: 32px
  }

  html,
  body,
  #__next {
    height: 100%;
  }

  html {
    box-sizing: border-box;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  body {
    background-color: var(--bg-color);
    color: var(--text-color);
    font-family: 'Inter', sans-serif;
    line-height: 1.5;
  }
`;

export default GlobalStyles;
