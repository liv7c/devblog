import Link from 'next/link';
import {useState} from 'react';

import {MaxWidthWrapper} from '../../styles/Wrapper';
import * as S from './SiteHeader.styles';

const SiteHeader = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <MaxWidthWrapper>
      <S.Wrapper>
        <span>Olivia Coumans</span>
        <nav aria-label="Main">
          <button onClick={() => setMenuVisible((currState) => !currState)}>
            Menu
          </button>
          <S.NavList style={{display: menuVisible ? 'block' : 'none'}}>
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
