import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { MaxWidthWrapper } from '../../styles/Wrapper';
import * as S from './SiteHeader.styles';

const SiteHeader = () => {
  const { pathname } = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);
  console.log('pathname', pathname);

  return (
    <header>
      <MaxWidthWrapper>
        <S.Wrapper>
          <S.Logo>
            <Link href="/" passHref>
              <S.NavLink>Olivia Coumans</S.NavLink>
            </Link>
          </S.Logo>
          <nav aria-label="Main">
            <S.NavMenuButton
              onClick={() => setMenuVisible((currState) => !currState)}
              aria-expanded={menuVisible}
            >
              Menu
            </S.NavMenuButton>
            <S.NavList isVisible={menuVisible}>
              <S.NavListItem>
                <Link href="/" passHref>
                  <S.NavLink current={pathname === '/'}>Home</S.NavLink>
                </Link>
              </S.NavListItem>
              <S.NavListItem>
                <Link href="/blog" passHref>
                  <S.NavLink current={pathname.includes('blog')}>
                    Blog
                  </S.NavLink>
                </Link>
              </S.NavListItem>
              <S.NavListItem>
                <Link href="/about" passHref>
                  <S.NavLink current={pathname === '/about'}>About</S.NavLink>
                </Link>
              </S.NavListItem>
            </S.NavList>
          </nav>
        </S.Wrapper>
      </MaxWidthWrapper>
    </header>
  );
};

export default SiteHeader;
