import styled from 'styled-components';

export const Link = styled.a`
  background: var(--button-bg);
  left: 0;
  padding: 10px 12px;
  position: absolute;
  z-index: 1;
  top: -50px;
  display: block;

  &,
  &:link,
  &:visited {
    color: var(--button-text);
  }

  &:focus {
    outline-offset: 3px;
    top: 0;
  }
`;
