import styled from 'styled-components';

import { QUERIES } from '../../styles/constants/Queries';

interface NavLinkProps {
  current?: boolean;
}

export const NavLinkItem = styled.a<NavLinkProps>`
  &,
  &:link,
  &:visited {
    color: ${({ current }) =>
      current ? 'var(--link-color)' : 'var(--text-color)'};
    text-decoration: none;
    display: block;
    padding: 25px var(--page-padding);

    @media ${QUERIES.tabletAndUp} {
      padding: 15px;
    }
  }
`;
