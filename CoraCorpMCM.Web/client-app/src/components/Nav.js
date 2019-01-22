import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import AuthContext from '../AuthContext';

const Nav = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        {isAuthenticated() ? (
          <>
            <li>
              <NavLink to="/collection">Collection</NavLink>
            </li>
            <li>
              <button onClick={logout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/register">Register New Museum</NavLink>
            </li>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
