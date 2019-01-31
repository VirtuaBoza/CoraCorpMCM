import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import AuthContext from './AuthContext';

const PrivateRoute = ({ component: Component, role, ...rest }) => {
  const auth = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={props => {
        if (!auth.isAuthenticated()) return <Redirect to="/login" />;

        if (role && !auth.userInRole(role))
          return <Redirect to="/unauthorized" />;

        return <Component auth={auth} {...props} />;
      }}
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  role: PropTypes.string,
};

export default PrivateRoute;
