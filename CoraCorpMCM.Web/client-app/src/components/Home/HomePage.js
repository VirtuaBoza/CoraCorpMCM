import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../AuthContext';

const HomePage = props => {
  const { isAuthenticated, getProfile } = useContext(AuthContext);
  return (
    <div style={{ flexGrow: 1 }}>
      {isAuthenticated() ? (
        <div>Welcome to {getProfile().museumName}</div>
      ) : (
        <>
          <div>Welcome Home</div>
          <Link to="/register">Register New Museum</Link>
        </>
      )}
    </div>
  );
};

export default HomePage;
