import styled from 'styled-components';

import { QUERIES } from '../../styles/constants/Queries';

export const FooterWrapper = styled.footer`
  margin-top: auto;
  background-color: var(--secondary-bg-color);
  padding: 10px 0;
  border-top: 1px solid var(--decorative-border-color);
`;

export const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: baseline;
`;

export const FooterCopyRight = styled.p`
  margin-right: 20px;
`;

export const FooterLinkList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 0;
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

export const ThemeTogglerWrapper = styled.div`
  margin-bottom: 20px;

  @media ${QUERIES.laptopAndUp} {
    display: none;
  }
`;
