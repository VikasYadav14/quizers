import React from 'react';
import Sidebar from './sidebar';

const Layout = ({ children,logout,user }) => {
  return (
    <div className="h-screen flex flex-row justify-start">
      <Sidebar logout={logout} user={user} />
      <div className="bg-primary flex-1 p-4 h-full">{children}</div>
    </div>
  );
};

export default Layout;
