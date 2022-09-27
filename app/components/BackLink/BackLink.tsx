import {Link} from '@remix-run/react';

interface BackLinkProps {
  text?: string;
  link?: string;
  className?: string;
}

function BackLink({
  text = 'Back to blog',
  link = '/blog',
  className = 'mb-7 lg:mb-12 inline-block',
}: BackLinkProps) {
  return (
    <Link to={link} className={className}>
      &larr; {text}
    </Link>
  );
}

export default BackLink;
