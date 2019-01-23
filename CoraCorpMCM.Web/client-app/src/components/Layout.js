import React from 'react';

const Layout = ({ nav, children }) => {
  return (
    <div>
      <div>{nav}</div>
      <div>{children}</div>
    </div>
  );
};

export default Layout;
