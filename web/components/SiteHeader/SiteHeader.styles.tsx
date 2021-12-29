import Link from 'next/link';
import styled from 'styled-components';

export const Wrapper = styled.header`
  padding: 20px 0;
  display: flex;
  justify-content: space-between;
  position: relative;
`;

export const NavList = styled.ul`
  list-style: none;
  position: absolute;
  left: 0;
  background-color: var(--bg-color);
  width: 100vw;
  padding: 30px 0;
  margin-left: calc(var(--page-padding) * -1);
`;

export const NavListItem = styled.li`
  border-top: 1px solid var(--dark-text-color);

  &:last-child {
    border-bottom: 1px solid var(--dark-text-color);
  }
`;

export const NavLink = styled.a`
  color: hsl(100deg, 100%, 100%);
  text-decoration: none;
  display: block;
  padding: 25px var(--page-padding);
`;
