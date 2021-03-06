import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import isEmail from 'validator/lib/isEmail';

import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import ForgotPasswordPage from './ForgotPasswordPage';
import ROUTES from '../../constants/routeConstants';
import authenticationService from '../../services/authenticationService';
import * as auth from '../../utilities/auth';

const styles = theme => ({
  formContainer: {
    marginTop: theme.spacing.unit * 8,
    marginBottom: theme.spacing.unit * 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`,
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    marginTop: theme.spacing.unit,
    width: '100%',
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  forgotPasswordButton: {
    marginTop: theme.spacing.unit * 2,
  },
});

const LoginPage = ({ location, history, classes }) => {
  if (auth.isAuthenticated()) return <Redirect to={ROUTES.HOME} />;

  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [formErrors, setFormErrors] = useState({ email: '', password: '' });
  const [loginFailed, setLoginFailed] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);

  const handleInputChanged = e => {
    const { name, value } = e.target;

    setCredentials({
      ...credentials,
      [name]: value,
    });

    validateField(e);
  };

  const handleSubmitClicked = e => {
    e.preventDefault();
    setLoginFailed(false);
    authenticationService
      .login(credentials)
      .then(json => {
        auth.handleAuthentication(json.token);
        if (location.state && location.state.referrer) {
          history.push(location.state.referrer);
        } else {
          history.push(ROUTES.HOME);
        }
      })
      .catch(err => {
        setLoginFailed(true);
        console.error(err);
      });
  };

  const validateField = e => {
    const { name, value, required } = e.target;

    if (required && /^ *$/.test(value)) {
      setFormErrors({
        ...formErrors,
        [name]: 'This field is required.',
      });
    } else {
      switch (name) {
        case 'email':
          setFormErrors({
            ...formErrors,
            email: isEmail(value) ? '' : 'Please enter a valid email address.',
          });
          break;
        default:
          setFormErrors({
            ...formErrors,
            [name]: '',
          });
      }
    }
  };

  const formIsValid = () => {
    const noFormErrors = Object.getOwnPropertyNames(formErrors).every(
      objProp => formErrors[objProp] === '',
    );
    const requiredFieldsArePopulated = [
      credentials.email,
      credentials.password,
    ].every(value => {
      return !/^ *$/.test(value);
    });
    return noFormErrors && requiredFieldsArePopulated;
  };

  const handleForgotPasswordClicked = () => {
    authenticationService
      .forgotPassword(credentials.email)
      .then(() => {
        setForgotPassword(true);
      })
      .catch(error => {
        setFormErrors({ ...formErrors, email: error });
      });
  };

  return forgotPassword ? (
    <ForgotPasswordPage />
  ) : (
    <Paper className={classes.formContainer}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <form className={classes.form}>
        <TextField
          name="email"
          label="Email"
          type="email"
          value={credentials.email}
          onChange={handleInputChanged}
          onBlur={validateField}
          helperText={formErrors.email || ' '}
          error={Boolean(formErrors.email)}
          margin="normal"
          autoComplete="email"
          variant="outlined"
          autoFocus
          fullWidth
          required
        />
        <TextField
          name="password"
          label="Password"
          type="password"
          value={credentials.password}
          onChange={handleInputChanged}
          onBlur={validateField}
          helperText={formErrors.password || ' '}
          error={Boolean(formErrors.password)}
          margin="normal"
          autoComplete="current-password"
          variant="outlined"
          fullWidth
          required
        />

        {loginFailed && (
          <Typography color="error">Invalid credentials.</Typography>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={handleSubmitClicked}
          disabled={!formIsValid()}
          fullWidth
        >
          Sign in
        </Button>
      </form>
      <Button
        variant="text"
        size="small"
        color="primary"
        onClick={handleForgotPasswordClicked}
        className={classes.forgotPasswordButton}
        disabled={!Boolean(credentials.email) || Boolean(formErrors.email)}
      >
        Forgot Password
      </Button>
    </Paper>
  );
};

export default withStyles(styles)(LoginPage);
