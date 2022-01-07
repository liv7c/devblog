import styled from 'styled-components';

export const PostDate = styled.time`
  font-size: 0.9rem;
  display: inline-block;

  span + & {
    margin-left: 20px;
  }
`;

export const PostListContainer = styled.ul`
  & > li:not(:last-child) {
    margin-bottom: 25px;
  }
`;
