import Link from 'next/link';
import styled from 'styled-components';

import { QUERIES } from '../../styles/constants/Queries';

export const Logo = styled.span`
  font-size: 1.2rem;

  a,
  a:link,
  a:visited {
    padding-left: 0;
    color: var(--text-color);
  }
`;

export const LogoLink = styled.a`
  &,
  &:link,
  &:visited {
    color: var(--text-color);
    text-decoration: none;
  }
`;

export const Wrapper = styled.div`
  padding: 0;
  display: flex;
  justify-content: space-between;
  position: relative;
  align-items: baseline;

  @media ${QUERIES.tabletAndUp} {
    padding: 20px 0;
  }
`;

export const NavMenuButton = styled.button`
  display: block;
  background-color: var(--button-bg);
  color: var(--button-text);
  border: none;
  padding: 10px 15px;
  border-radius: 2px;

  @media ${QUERIES.tabletAndUp} {
    display: none;
  }
`;

interface NavListProps {
  isVisible: boolean;
}

export const NavList = styled.ul<NavListProps>`
  list-style: none;
  position: absolute;
  left: 0;
  background-color: var(--bg-color);
  width: 100vw;
  padding: 30px 0;
  margin-left: calc(var(--page-padding) * -1);
  display: ${(props) => (props.isVisible ? 'block' : 'none')};

  @media ${QUERIES.tabletAndUp} {
    display: block;
    position: static;
    background-color: none;
    width: auto;
    display: flex;
    margin: 0;
    margin-left: auto;
    padding: 0;
  }
`;

export const NavListItem = styled.li`
  --border-color: rgba(0, 0, 0, 0.2);
  border-top: 1px solid var(--border-color);

  &:last-child {
    border-bottom: 1px solid var(--border-color);
  }

  @media ${QUERIES.tabletAndUp} {
    border-top: none;

    &:not(:last-child) {
      margin-right: 10px;
    }

    &:last-child {
      border-bottom: none;
    }
  }
`;

export const LeftSide = styled.div`
  display: flex;
  align-items: baseline;
`;

export const DesktopTogglerContainer = styled.div`
  display: none;

  @media ${QUERIES.laptopAndUp} {
    min-width: 130px;
    display: block;
    margin-left: 21px;
  }
`;
