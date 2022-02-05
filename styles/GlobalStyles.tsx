import { createGlobalStyle } from 'styled-components';

import { QUERIES } from './constants/Queries';

const GlobalStyles = createGlobalStyle`
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

  body,
  body[data-theme="light"] {
    --bg-color: #fffffe;
    --secondary-bg-color:#bfdbfe;
    --text-color: #2b2c34;
    --link-color: #1d4ed8;
    --pre-code-color: #2b2c34;
    --pre-code-bg-color: #f2f2f1;

    --nav-link-active-color: #1d42d8;

    --theme-toggler-bg: #111;
    --theme-toggler-color: #fff;

    --body-font-weight: 400;

    --decorative-border-color: transparent;

    --button-text: #fffffe;
    --button-bg: #1d4ed8;

    --page-padding: 20px;

    --selection-color: #fff;
    --selection-background: #1e3a8a;
  }

  body[data-theme="dark"]  {
    --bg-color: #1f2028;
    --secondary-bg-color: #1f2028;
    --text-color: #fefefe;
    --link-color: #f2f2f2;
    --nav-link-active-color: #bfdbf2;

    --body-font-weight: 300;
    --decorative-border-color: #f2f2f2;

    --pre-code-color: #fff;
    --pre-code-bg-color: #2d3037;

    --theme-toggler-bg: #fff;
    --theme-toggler-color: #111;
  }

  ::selection {
    color: var(--selection-color);
    background-color:
      var(--selection-background);
  }

  body {
    background-color: var(--bg-color);
    color: var(--text-color);
    font-family: 'Merriweather', serif;
    font-weight: var(--body-font-weight);
    line-height: 1.75;
    overflow-y: scroll;
  }

  img, picture, video, canvas, svg {
    display: block;
    max-width: 100%;
  }

  p {
    margin-bottom: 1rem;
    max-width: 70ch;
  }

  h1, h2, h3, h4, h5 {
    margin: 3rem 0 1.38rem;
    font-family: 'Merriweather', serif;
    font-weight: 400;
    line-height: 1.3;
  }

  h1 {
    margin-top: 0;
    font-size: 2.1rem;

    @media ${QUERIES.laptopAndUp} {
      font-size: 2.488rem;
    }
  }

  h2 {font-size: 2.074rem;}

  h3 {font-size: 1.728rem;}

  h4 {font-size: 1.44rem;}

  h5 {font-size: 1.2rem;}

  small, .text_small {font-size: 0.833rem;}

  a,
  a:link,
  a:visited {
    color: var(--text-color);
  }

  ul, ol {
    padding-left: 10px;
  }

  li {
    margin-bottom: 12px;
  }

  code {
    color: var(--pre-code-color);
    background-color: var(--pre-code-bg-color);
    padding: 4px 5px;
    border-radius: 3px;
  }

  code[class^="language"] {
    background-color: transparent;
    padding: 0;
    border-radius: 0;
  }
`;

export default GlobalStyles;
