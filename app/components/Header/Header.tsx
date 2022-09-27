import type {ReactNode} from 'react';
import { useEffect, useState} from 'react';
import {Link, NavLink, useLocation} from '@remix-run/react';
import clsx from 'clsx';

const MenuLink = ({
  to,
  children,
  isLast = false,
}: {
  to: string;
  children: ReactNode;
  isLast?: boolean;
}) => {
  const classes = clsx('block py-3 px-4 no-underline text-lg', {
    'mr-4': !isLast,
  });

  return (
    <NavLink to={to} className={classes}>
      {children}
    </NavLink>
  );
};

function Header() {
  const [menuVisible, setMenuVisible] = useState(false);
  const {pathname} = useLocation();

  const toggleMenu = () => {
    setMenuVisible((prevState) => !prevState);
  };

  useEffect(() => {
    setMenuVisible(false);
  }, [pathname]);

  return (
    <header>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <div className="flex justify-between container items-center md:items-baseline h-full relative">
        <span>
          <Link to="/" className="no-underline text-lg">
            Olivia Coumans
          </Link>
        </span>
        <nav aria-label="Main" className="h-full">
          <button
            className="md:hidden bg-slate-700 text-white py-3 px-4 rounded mt-2 mb-2"
            onClick={toggleMenu}
            aria-expanded={menuVisible}
          >
            Menu
          </button>
          <ul
            className={clsx(
              'list-none p-0 m-0 md:flex items-baseline absolute z-40 w-screen md:w-auto md:static left-0 mt-6 md:mt-0 bg-beige md:bg-transparent',
              {
                hidden: !menuVisible,
              }
            )}
          >
            <li className="mb-2 md:mb-0 border-b border-gray-200 md:border-none">
              <MenuLink to="/">Home</MenuLink>
            </li>
            <li className="mb-2 md:mb-0 border-b border-gray-200 md:border-none">
              <MenuLink to="/blog">Blog</MenuLink>
            </li>
            <li className="border-b border-gray-200 md:border-none">
              <MenuLink to="/about" isLast>
                About
              </MenuLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
