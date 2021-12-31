import {MaxWidthWrapper} from '../../styles/Wrapper';
import * as S from './SiteFooter.styles';

const SiteFooter = () => {
  return (
    <S.FooterWrapper>
      <MaxWidthWrapper>
        <p>&copy; {new Date().getFullYear()} &mdash; Olivia Coumans</p>
        <S.FooterLinkList>
          <S.FooterLinkListItem>
            <a href="https://github.com/liv7c">Github</a>
          </S.FooterLinkListItem>
          <S.FooterLinkListItem>
            <a href="https://www.linkedin.com/in/olivia-coumans/">Linkedin</a>
          </S.FooterLinkListItem>
          <S.FooterLinkListItem>
            <a href="https://twitter.com/ocoumans7">Twitter</a>
          </S.FooterLinkListItem>
        </S.FooterLinkList>
      </MaxWidthWrapper>
    </S.FooterWrapper>
  );
};

export default SiteFooter;
