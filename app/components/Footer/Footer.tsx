function Footer() {
  return (
    <footer className="mt-auto bg-slate-800 text-white py-5">
      <div className="container flex flex-wrap justify-between items-baseline">
        <p className="mb-2 mr-12">
          &copy; {new Date().getFullYear()} &mdash; Olivia Coumans
        </p>
        <ul className="flex flex-wrap list-none mt-0 mb-0 p-0 -ml-5 md:ml-0">
          <li>
            <a
              href="https://github.com/liv7c"
              className="py-2 px-5  md:p-5 block text-white hover:opacity-90 hover:text-white transition-opacity"
            >
              Github
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/olivia-coumans/"
              className="py-2 px-5  md:p-5 block text-white hover:opacity-90 hover:text-white transition-opacity"
            >
              Linkedin
            </a>
          </li>
          <li>
            <a
              href="https://twitter.com/liv_codes"
              className="py-2 px-5  md:p-5 block text-white hover:opacity-90 hover:text-white transition-opacity"
            >
              Twitter
            </a>
          </li>
          <li>
            <a
              href="/rss/feed.xml"
              className="py-2 px-5  md:p-5 block text-white hover:opacity-90 hover:text-white transition-opacity"
            >
              RSS Feed
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
