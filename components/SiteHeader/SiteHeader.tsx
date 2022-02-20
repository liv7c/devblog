import dynamic from 'next/dynamic';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {useState} from 'react';

import {MaxWidthWrapper} from '../../styles/Wrapper';
import NavLink from '../NavLink';
import SkipLink from '../SkipLink';
import * as S from './SiteHeader.styles';

const ThemeToggler = dynamic(() => import('../ThemeToggler'), {ssr: false});

const SiteHeader = () => {
  const {pathname} = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <header>
      <MaxWidthWrapper>
        <SkipLink />
        <S.Wrapper>
          <S.Logo>
            <Link href="/" passHref>
              <S.LogoLink>Olivia Coumans</S.LogoLink>
            </Link>
          </S.Logo>

          <S.LeftSide>
            <nav aria-label="Main">
              <S.NavMenuButton
                onClick={() => setMenuVisible((currState) => !currState)}
                aria-expanded={menuVisible}
              >
                Menu
              </S.NavMenuButton>
              <S.NavList isVisible={menuVisible}>
                <S.NavListItem>
                  <NavLink href="/" name="Home" isCurrent={pathname === '/'} />
                </S.NavListItem>
                <S.NavListItem>
                  <NavLink
                    href="/blog"
                    name="Blog"
                    isCurrent={pathname.includes('blog')}
                  />
                </S.NavListItem>
                <S.NavListItem>
                  <NavLink
                    href="/about"
                    name="About"
                    isCurrent={pathname === '/about'}
                  />
                </S.NavListItem>
              </S.NavList>
            </nav>
            <S.DesktopTogglerContainer>
              <ThemeToggler />
            </S.DesktopTogglerContainer>
          </S.LeftSide>
        </S.Wrapper>
      </MaxWidthWrapper>
    </header>
  );
};

export default SiteHeader;
