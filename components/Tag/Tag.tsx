import { ReactNode } from 'react';

import * as S from './Tag.styles';

interface TagProps {
  children: ReactNode;
}

const Tag = ({ children }: TagProps) => {
  return <S.Tag>{children}</S.Tag>;
};

export default Tag;
