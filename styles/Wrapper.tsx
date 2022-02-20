import styled from 'styled-components';

import {QUERIES} from './constants/Queries';

export const MaxWidthWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 10px var(--page-padding);
`;

interface MaxWidthPageContentWrapperProps {
  withLargeBottomSpace?: boolean;
}

export const MaxWidthPageContentWrapper = styled(
  MaxWidthWrapper
)<MaxWidthPageContentWrapperProps>`
  padding-top: 30px;
  padding-bottom: ${({withLargeBottomSpace}) =>
    withLargeBottomSpace ? '70px' : '30px'};

  @media ${QUERIES.tabletAndUp} {
    padding-top: 10px;
    padding-bottom: ${({withLargeBottomSpace}) =>
      withLargeBottomSpace ? '70px' : '10px'};
  }
`;

interface PageTitleWrapperProps {
  largeSpace?: boolean;
}

export const PageTitleWrapper = styled.div<PageTitleWrapperProps>``;
