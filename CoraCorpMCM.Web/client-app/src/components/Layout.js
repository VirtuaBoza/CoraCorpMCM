import React from 'react';

const Layout = ({ nav, children }) => {
  return (
    <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      {nav}
      {children}
    </div>
  );
};

export default Layout;
