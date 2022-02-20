import Link from 'next/link';

import * as S from './ButtonLink.styles';

interface ButtonLinkProps {
  href: string;
  name: string;
}

function ButtonLink({href, name}: ButtonLinkProps) {
  return (
    <Link href={href} passHref>
      <S.Link>{name}</S.Link>
    </Link>
  );
}

export default ButtonLink;
