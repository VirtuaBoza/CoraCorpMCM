import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import AuthContext from '../../AuthContext';

const HomePage = () => {
  const { isAuthenticated, getProfile } = useContext(AuthContext);
  return (
    <>
      {isAuthenticated() ? (
        <div>Welcome to {getProfile().museumName}</div>
      ) : (
        <>
          <div>Welcome Home</div>
          <Link to="/register">Register New Museum</Link>
        </>
      )}
    </>
  );
};

export default HomePage;
