import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import AuthContext from '../../AuthContext';

const EmailConfirmedPage = props => {
  const auth = useContext(AuthContext);

  const token = new URLSearchParams(props.location.search).get('t');
  if (token) {
    auth.storeToken(token);
  }

  if (auth.isAuthenticated()) return <Redirect to="/" />;

  return <Redirect to="/login" />;
};

export default EmailConfirmedPage;
