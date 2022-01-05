import styled from 'styled-components';

import { QUERIES } from '../../styles/constants/Queries';

export const FooterWrapper = styled.footer`
  margin-top: auto;
  background-color: var(--secondary-bg-color);
  padding: 10px 0;
`;

export const FooterContent = styled.div`
  @media ${QUERIES.laptopAndUp} {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }
`;

export const FooterLinkList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
`;

export const FooterLinkListItem = styled.li`
  &:not(:last-child) {
    margin-right: 10px;
  }

  a {
    display: block;
    padding: 10px;
  }
`;
