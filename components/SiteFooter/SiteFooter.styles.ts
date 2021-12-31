import styled from 'styled-components';

export const FooterWrapper = styled.footer`
  margin-top: auto;
  background-color: var(--secondary-bg-color);
  padding: 20px;
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
    padding: 20px 10px;
    color: var(--text-color);
  }
`;
