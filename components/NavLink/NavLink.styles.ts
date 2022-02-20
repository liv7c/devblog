import styled from 'styled-components';

import {QUERIES} from '../../styles/constants/Queries';

interface NavLinkProps {
  current?: boolean;
}

export const NavLinkItem = styled.a<NavLinkProps>`
  &,
  &:link,
  &:visited {
    color: ${({current}) =>
      current ? 'var(--nav-link-active-color)' : 'var(--text-color)'};
    text-decoration: none;
    display: block;
    padding: 25px var(--page-padding);
    text-decoration: underline;

    @media ${QUERIES.tabletAndUp} {
      padding: 15px;
    }
  }

  &:not(:hover),
  &:link:not(:hover),
  &:visited:not(:hover) {
    text-decoration: none;
  }
`;
