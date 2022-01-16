import dynamic from 'next/dynamic';

import { MaxWidthWrapper } from '../../styles/Wrapper';
import * as S from './SiteFooter.styles';

const ThemeToggler = dynamic(() => import('../ThemeToggler'), {
  ssr: false,
});

const SiteFooter = () => {
  return (
    <S.FooterWrapper>
      <MaxWidthWrapper>
        <S.FooterContent>
          <S.FooterCopyRight data-testid="footer-text">
            &copy; {new Date().getFullYear()} &mdash; Olivia Coumans
          </S.FooterCopyRight>
          <S.FooterLinkList>
            <S.FooterLinkListItem>
              <a href="https://github.com/liv7c">Github</a>
            </S.FooterLinkListItem>
            <S.FooterLinkListItem>
              <a href="https://www.linkedin.com/in/olivia-coumans/">Linkedin</a>
            </S.FooterLinkListItem>
            <S.FooterLinkListItem>
              <a href="https://twitter.com/liv_codes">Twitter</a>
            </S.FooterLinkListItem>
            <S.FooterLinkListItem>
              <a href="/rss/feed.xml">RSS</a>
            </S.FooterLinkListItem>
          </S.FooterLinkList>
        </S.FooterContent>
        <S.ThemeTogglerWrapper>
          <ThemeToggler />
        </S.ThemeTogglerWrapper>
      </MaxWidthWrapper>
    </S.FooterWrapper>
  );
};

export default SiteFooter;
