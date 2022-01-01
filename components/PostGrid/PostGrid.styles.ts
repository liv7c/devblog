import styled from 'styled-components';

export const PostGrid = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(250px, 100%), 1fr));
  grid-gap: 20px;
  padding: 0;
  list-style: none;
`;

export const ImageWrapper = styled.div`
  margin-left: -20px;
  margin-right: -20px;
  border-radius: 2px;
  overflow: hidden;

  img {
    display: block;
    width: 100%;
  }
`;

export const PostCard = styled.li`
  border: 1px solid #dedede;
  padding: 0 20px 10px;
  border-radius: 2px;
`;

export const PostTitle = styled.h2`
  margin: 10px 0;
  font-size: 1.2rem;
`;

export const PostInfo = styled.div`
  margin-top: 25px;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

export const PostDate = styled.time`
  font-size: 0.9rem;
`;
