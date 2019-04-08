import React from 'react';
import { Redirect } from 'react-router-dom';

import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import * as auth from '../../utilities/auth';
import ROUTES from '../../constants/routeConstants';

const styles = theme => ({
  forgotPasswordContainer: {
    marginTop: theme.spacing.unit * 8,
    marginBottom: theme.spacing.unit * 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`,
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
  },
});

const ForgotPasswordPage = ({ classes }) => {
  if (auth.isAuthenticated()) return <Redirect to={ROUTES.HOME} />;

  return (
    <Paper className={classes.forgotPasswordContainer}>
      <Typography component="h1" variant="h4" color="inherit" gutterBottom>
        You forgot your password?
      </Typography>
      <Typography variant="h6" color="textSecondary">
        No worries. We're sending you an email with a link to reset your
        password.
      </Typography>
    </Paper>
  );
};

export default withStyles(styles)(ForgotPasswordPage);
