import {createGlobalStyle} from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --bg-color: #fffffe;
    --text-color: #2b2c34;
    --link-color: #6246ea;

    --button-text: #fffffe;
    --button-bg: #6246ea;

    --page-padding: 32px;
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
    font-family: 'Merriweather', serif;
    line-height: 1.5;
  }
`;

export default GlobalStyles;
