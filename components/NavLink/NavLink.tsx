import Link from 'next/link';
import styled from 'styled-components';

import * as S from './NavLink.styles';

interface NavLinkProps {
  href: string;
  name: string;
  isCurrent: boolean;
}

function NavLink({ href, name, isCurrent }: NavLinkProps) {
  return (
    <Link href={href} passHref>
      <S.NavLinkItem
        current={isCurrent}
        {...(isCurrent ? { 'aria-current': 'page' } : {})}
      >
        {name}
      </S.NavLinkItem>
    </Link>
  );
}

export default NavLink;
