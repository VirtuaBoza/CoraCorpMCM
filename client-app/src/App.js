import React, { Suspense, lazy } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { HubConnectionBuilder } from '@aspnet/signalr';
import * as auth from './utilities/auth';

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import ROUTES from './constants/routeConstants';
import ROLES from './constants/roles';

import MuseumHubContext from './contexts/MuseumHubContext';

import Layout from './components/Layout';
import TopNav from './components/TopNav';
import PrivateRoute from './components/PrivateRoute';
import Loading from './components/Shared/Loading';

import WelcomePage from './components/Index/WelcomePage';
import CollectionPage from './components/Collection/CollectionPage';
import UnauthorizedPage from './components/Unauthorized/UnauthorizedPage';
import EmailConfirmedPage from './components/Register/EmailConfirmedPage';
import ResetPasswordPage from './components/Login/ResetPasswordPage';
import NotFoundPage from './components/NotFound/NotFoundPage';
import ItemEditPage from './components/ItemEdit/ItemEditPage';

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

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      museumHubConnection: null,
    };
  }

  componentDidMount() {
    if (auth.isAuthenticated()) {
      if (!this.state.museumHubConnection) {
        this.createHubConnection();
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (auth.isAuthenticated()) {
      if (!this.state.museumHubConnection) {
        this.createHubConnection();
      }
    } else if (prevState.museumHubConnection) {
      console.log('clear');
      this.setState({ museumHubConnection: null });
    }
  }

  createHubConnection = async () => {
    const museumHubConnection = new HubConnectionBuilder()
      .withUrl('/museumHub')
      .build();

    const callback = () => {
      console.log('connected');
      museumHubConnection.send('JoinGroup', auth.getProfile().museumId);
      this.setState({ museumHubConnection });
    };

    museumHubConnection.onclose(async () => {
      console.log('connection closed');
      this.setState({ museumHubConnection: null });
      await this.startHubConnection(museumHubConnection, callback);
    });

    await this.startHubConnection(museumHubConnection, callback);
  };

  startHubConnection = async (connection, callback) => {
    try {
      await connection.start().then(callback);
    } catch (err) {
      console.log(err);
      setTimeout(() => this.startHubConnection(connection, callback), 5000);
    }
  };

  render() {
    const { museumHubConnection } = this.state;

    return (
      <MuiThemeProvider theme={theme}>
        <MuseumHubContext.Provider value={museumHubConnection}>
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
                    path={ROUTES.EMAIL_CONFIRMED}
                    component={EmailConfirmedPage}
                  />
                  <Route
                    path={ROUTES.RESET_PASSWORD}
                    component={ResetPasswordPage}
                  />
                  <PrivateRoute
                    path={ROUTES.COLLECTION}
                    component={CollectionPage}
                  />
                  <PrivateRoute
                    path={ROUTES.ITEM_EDIT}
                    component={ItemEditPage}
                    roles={[
                      ROLES.CONTRIBUTOR,
                      ROLES.ADMINISTRATOR,
                      ROLES.DIRECTOR,
                    ]}
                  />
                  <Route
                    path={ROUTES.UNAUTHORIZED}
                    component={UnauthorizedPage}
                  />
                  <Route path={ROUTES.NOT_FOUND} component={NotFoundPage} />
                  <Route component={NotFoundPage} />
                </Switch>
              </Suspense>
            </Layout>
          </div>
        </MuseumHubContext.Provider>
      </MuiThemeProvider>
    );
  }
}

export default withRouter(App);
