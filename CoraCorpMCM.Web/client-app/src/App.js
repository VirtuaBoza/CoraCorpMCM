import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import Auth from './utilities/Auth';

import AuthContext from './AuthContext';

import Layout from './components/Layout';
import Nav from './components/Nav';
import HomePage from './components/Home/HomePage';
import LoginPage from './components/Login/LoginPage';
import CollectionPage from './components/Collection/CollectionPage';
import RegisterPage from './components/Register/RegisterPage';
import UnauthorizedPage from './components/Unauthorized/UnauthorizedPage';
import EmailConfirmedPage from './components/EmailConfirmedPage';
import PrivateRoute from './components/PrivateRoute';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: new Auth(props.history),
    };
  }
  render() {
    const { auth } = this.state;

    return (
      <AuthContext.Provider value={auth}>
        <Layout nav={<Nav />}>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/register" component={RegisterPage} />
            <Route
              path="/login"
              render={props => <LoginPage {...props} auth={auth} />}
            />
            <Route path="/unauthorized" component={UnauthorizedPage} />
            <Route path="/emailConfirmed" component={EmailConfirmedPage} />
            <PrivateRoute path="/collection" component={CollectionPage} />
          </Switch>
        </Layout>
      </AuthContext.Provider>
    );
  }
}

export default withRouter(App);
