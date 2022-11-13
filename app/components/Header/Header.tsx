import type {ReactNode} from 'react';
import {Link, NavLink} from '@remix-run/react';
import clsx from 'clsx';

const MenuLink = ({to, children}: {to: string; children: ReactNode}) => {
  const classes = clsx('block py-3 px-4 no-underline text-lg');

  return (
    <NavLink to={to} className={classes} prefetch="intent">
      {children}
    </NavLink>
  );
};

function Header() {
  return (
    <header>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <div className="pt-2 md:py-0 flex flex-col md:flex-row items-center justify-between container md:items-baseline h-full relative">
        <Link to="/" className="block pt-2 pb-1 no-underline text-lg font-bold">
          Olivia Coumans
        </Link>
        <nav aria-label="Main" className="h-full mt-1 md:mt-0">
          <ul
            className={clsx(
              'list-none px-0 m-0 flex justify-center items-baseline space-x-2'
            )}
          >
            <li className="-my-1 md:my-2">
              <MenuLink to="/">Home</MenuLink>
            </li>
            <li className="-my-1 md:my-2">
              <MenuLink to="/blog">Blog</MenuLink>
            </li>
            <li className="-my-1 md:my-2">
              <MenuLink to="/about">About</MenuLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
