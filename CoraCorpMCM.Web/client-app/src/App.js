import React, { Component, Suspense, lazy } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Auth from './utilities/Auth';

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import AuthContext from './AuthContext';
import ROUTES from './constants/routeConstants';

import Layout from './components/Layout';
import TopNav from './components/TopNav';
import WelcomePage from './components/Index/WelcomePage';
import CollectionPage from './components/Collection/CollectionPage';
import UnauthorizedPage from './components/Unauthorized/UnauthorizedPage';
import EmailConfirmedPage from './components/Register/EmailConfirmedPage';
import PrivateRoute from './PrivateRoute';
import Loading from './components/Shared/Loading';
import ForgotPasswordPage from './components/Login/ForgotPasswordPage';

const LoginPage = lazy(() => import('./components/Login/LoginPage'));
const RegisterPage = lazy(() => import('./components/Register/RegisterPage'));
const DashboardPage = lazy(() =>
  import('./components/Dashboard/DashboardPage'),
);

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      main: '#546e7a',
    },
    secondary: {
      main: '#40c4ff',
    },
  },
});

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
      <MuiThemeProvider theme={theme}>
        <AuthContext.Provider value={auth}>
          <CssBaseline />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: '100vh',
            }}
          >
            <Layout nav={<TopNav />}>
              <Suspense fallback={<Loading />}>
                <Switch>
                  <Route
                    exact
                    path={ROUTES.HOME}
                    render={props =>
                      auth.isAuthenticated() ? (
                        <DashboardPage {...props} />
                      ) : (
                        <WelcomePage {...props} />
                      )
                    }
                  />
                  <Route
                    path={ROUTES.REGISTER}
                    render={props => <RegisterPage {...props} />}
                  />
                  <Route
                    path={ROUTES.LOGIN}
                    render={props => <LoginPage {...props} />}
                  />
                  <Route
                    path={ROUTES.UNAUTHORIZED}
                    component={UnauthorizedPage}
                  />
                  <Route
                    path={ROUTES.EMAIL_CONFIRMED}
                    component={EmailConfirmedPage}
                  />
                  <Route
                    path={ROUTES.FORGOT_PASSWORD}
                    component={ForgotPasswordPage}
                  />
                  <PrivateRoute
                    path={ROUTES.COLLECTION}
                    component={CollectionPage}
                  />
                </Switch>
              </Suspense>
            </Layout>
          </div>
        </AuthContext.Provider>
      </MuiThemeProvider>
    );
  }
}

export default withRouter(App);
