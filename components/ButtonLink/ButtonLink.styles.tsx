import styled from 'styled-components';

export const Link = styled.a`
  &:link,
  &:visited {
    display: inline-block;
    padding: 8px 16px;
    border: 1px var(--text-color) solid;
    color: var(--text-color);
    border-radius: 4px;
    text-decoration: none;
    outline-offset: 2px;
    transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);

    &:hover {
      opacity: 0.9;
      border: 1px solid transparent;
      background-color: var(--text-color);
      color: var(--bg-color);
    }
  }
`;
