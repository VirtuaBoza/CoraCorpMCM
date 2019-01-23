import React, { useContext } from 'react';
import { NavLink, withRouter } from 'react-router-dom';

import AuthContext from '../AuthContext';

const Nav = props => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const { history } = props;
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        {isAuthenticated() ? (
          <li>
            <button
              onClick={() => {
                logout();
                history.push('/');
              }}
            >
              Logout
            </button>
          </li>
        ) : (
          <>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default withRouter(Nav);
