import styled from 'styled-components';

export const MaxWidthWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding-left: var(--page-padding);
  padding-right: var(--page-padding);
`;

interface PageTitleWrapperProps {
  largeSpace?: boolean;
}

export const PageTitleWrapper = styled.div<PageTitleWrapperProps>`
  padding: 10px 0;
  padding-bottom: ${(props) => (props.largeSpace ? '70px' : '10px')};
`;
