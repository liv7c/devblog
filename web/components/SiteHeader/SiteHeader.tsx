import Link from 'next/link';
import {useState} from 'react';

import {MaxWidthWrapper} from '../../styles/Wrapper';
import * as S from './SiteHeader.styles';

const SiteHeader = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
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
                <S.NavLink>Home</S.NavLink>
              </Link>
            </S.NavListItem>
            <S.NavListItem>
              <Link href="/blog" passHref>
                <S.NavLink>Blog</S.NavLink>
              </Link>
            </S.NavListItem>
            <S.NavListItem>
              <Link href="/about" passHref>
                <S.NavLink>About</S.NavLink>
              </Link>
            </S.NavListItem>
          </S.NavList>
        </nav>
      </S.Wrapper>
    </MaxWidthWrapper>
  );
};

export default SiteHeader;
