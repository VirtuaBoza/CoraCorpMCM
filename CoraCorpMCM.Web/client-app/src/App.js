import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Auth from './utilities/Auth';

import AuthContext from './AuthContext';

import Nav from './components/Nav';
import HomePage from './components/Home/HomePage';
import LoginPage from './components/Login/LoginPage';
import CollectionPage from './components/Collection/CollectionPage';
import RegisterPage from './components/Register/RegisterPage';
import UnauthorizedPage from './components/Unauthorized/UnauthorizedPage';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: new Auth(this.props.history),
    };
  }
  render() {
    const { auth } = this.state;

    return (
      <AuthContext.Provider value={auth}>
        <Nav />
        <Route exact path="/" component={HomePage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/collection" component={CollectionPage} />
        <Route path="/unauthorized" component={UnauthorizedPage} />
      </AuthContext.Provider>
    );
  }
}

export default App;
