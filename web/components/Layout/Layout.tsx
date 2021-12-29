import {ReactNode} from 'react';

import SiteHeader from '../SiteHeader';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({children}: LayoutProps) => {
  return (
    <>
      <SiteHeader />
      <main>{children}</main>
    </>
  );
};

export default Layout;
