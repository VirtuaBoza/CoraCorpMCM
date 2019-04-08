import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as auth from '../utilities/auth';

const PrivateRoute = ({ component: Component, roles, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (!auth.isAuthenticated()) return <Redirect to="/login" />;

        if (roles && !auth.userInRole(roles))
          return <Redirect to="/unauthorized" />;

        return <Component auth={auth} {...props} />;
      }}
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  roles: PropTypes.arrayOf(PropTypes.string),
};

export default PrivateRoute;
