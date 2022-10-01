export function getSEOMeta({
  currentPath,
  title = 'Olivia Coumans',
  description = 'Front-end developer passionate about building robust UIs.',
  keywords = '',
}: {
  currentPath: string;
  title?: string;
  description?: string;
  keywords?: string;
}) {
  const url =
    currentPath === '/'
      ? 'https://oliviac.dev'
      : `https://oliviac.dev${currentPath}`;

  return {
    description,
    keywords,
    image: '/img/blog-img.png',
    'og:url': url,
    'og:title': title,
    'og:description': description,
    'og:image': '/img/blog-img.png',
    'twitter:card': 'summary',
    'twitter:creator': '@liv_codes',
    'twitter:title': title,
    'twitter:description': description,
    'twitter:image': '/img/blog-img.png',
    'twitter:alt': title,
  };
}
