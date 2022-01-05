import { MaxWidthWrapper } from '../../styles/Wrapper';
import * as S from './SiteFooter.styles';

const SiteFooter = () => {
  return (
    <S.FooterWrapper>
      <MaxWidthWrapper>
        <S.FooterContent>
          <p data-testid="footer-text">
            &copy; {new Date().getFullYear()} &mdash; Olivia Coumans
          </p>
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
      </MaxWidthWrapper>
    </S.FooterWrapper>
  );
};

export default SiteFooter;
