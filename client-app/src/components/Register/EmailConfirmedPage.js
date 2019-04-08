import React from 'react';
import { Redirect } from 'react-router-dom';

import * as auth from '../../utilities/auth';

const EmailConfirmedPage = props => {
  const token = new URLSearchParams(props.location.search).get('t');
  if (token) {
    auth.handleAuthentication(token);
    return <div>Email confirmed</div>; //TODO: Enhance
  }

  if (auth.isAuthenticated()) return <Redirect to="/" />;

  return <Redirect to="/login" />;
};

export default EmailConfirmedPage;
