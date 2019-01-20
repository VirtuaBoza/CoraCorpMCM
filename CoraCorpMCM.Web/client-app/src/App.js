import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Nav from './components/Nav';
import HomePage from './components/Home/HomePage';
import LoginPage from './components/Login/LoginPage';
import CollectionPage from './components/Collection/CollectionPage';
import RegisterPage from './components/Register/RegisterPage';
import UnauthorizedPage from './components/Unauthorized/UnauthorizedPage';

class App extends Component {
  render() {
    return (
      <>
        <Nav />
        <Route exact path="/" component={HomePage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/collection" component={CollectionPage} />
        <Route path="/unauthorized" component={UnauthorizedPage} />
      </>
    );
  }
}

export default App;
