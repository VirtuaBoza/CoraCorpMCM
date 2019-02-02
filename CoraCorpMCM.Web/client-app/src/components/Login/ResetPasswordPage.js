import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Isemail from 'isemail';

import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import AuthContext from '../../AuthContext';
import authenticationService from '../../services/authenticationService';
import ROUTES from '../../constants/routeConstants';

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
    marginBottom: theme.spacing.unit,
    width: '100%',
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

const ResetPasswordPage = ({ classes, location, history }) => {
  const auth = useContext(AuthContext);
  const code = new URLSearchParams(location.search).get('c').replace(/ /g, '+');
  if (auth.isAuthenticated() || !code) return <Redirect to="/" />;

  const [resetPasswordModel, setResetPasswordModel] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    code,
  });
  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [resetComplete, setResetComplete] = useState(false);
  const [error, setError] = useState('');

  const handleInputChanged = e => {
    const { name, value } = e.target;

    setResetPasswordModel({
      ...resetPasswordModel,
      [name]: value,
    });

    validateField(e);
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
            email: Isemail.validate(value)
              ? ''
              : 'Please enter a valid email address.',
          });
          break;
        case 'password':
          setFormErrors({
            ...formErrors,
            password:
              value.length < 6
                ? 'Password must be at least 6 characters.'
                : value.length > 100
                ? 'Password cannot be more than 100 characters.'
                : '',
            confirmPassword:
              resetPasswordModel.confirmPassword.length > 0 &&
              value !== resetPasswordModel.confirmPassword
                ? 'Password fields must match.'
                : '',
          });
          break;
        case 'confirmPassword':
          setFormErrors({
            ...formErrors,
            confirmPassword:
              value !== resetPasswordModel.password
                ? 'Password fields must match.'
                : '',
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

  const handleSubmitClicked = e => {
    e.preventDefault();
    setError('');

    authenticationService
      .changePassword(resetPasswordModel)
      .then(() => {
        setResetComplete(true);
      })
      .catch(() => {
        setError('Something went wrong.');
      });
  };

  const formIsValid = () => {
    const noFormErrors = Object.getOwnPropertyNames(formErrors).every(
      objProp => formErrors[objProp] === '',
    );
    const requiredFieldsArePopulated = [
      resetPasswordModel.email,
      resetPasswordModel.password,
      resetPasswordModel.confirmPassword,
    ].every(value => {
      return !/^ *$/.test(value);
    });
    return noFormErrors && requiredFieldsArePopulated;
  };

  return (
    <Paper className={classes.formContainer}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5" gutterBottom>
        Reset password
      </Typography>
      {resetComplete ? (
        <>
          <Typography component="h2" variant="h6">
            Your password was reset.
          </Typography>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => history.push(ROUTES.LOGIN)}
            fullWidth
          >
            Login
          </Button>
        </>
      ) : (
        <form className={classes.form}>
          <TextField
            name="email"
            label="Email"
            type="email"
            value={resetPasswordModel.email}
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
            label="New Password"
            type="password"
            value={resetPasswordModel.password}
            onChange={handleInputChanged}
            onBlur={validateField}
            helperText={formErrors.password || ' '}
            error={Boolean(formErrors.password)}
            margin="normal"
            autoComplete="new-password"
            variant="outlined"
            fullWidth
            required
          />
          <TextField
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            value={resetPasswordModel.confirmPassword}
            onChange={handleInputChanged}
            onBlur={validateField}
            helperText={formErrors.confirmPassword || ' '}
            error={Boolean(formErrors.confirmPassword)}
            margin="normal"
            autoComplete="new-password"
            variant="outlined"
            fullWidth
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmitClicked}
            disabled={!formIsValid()}
            fullWidth
          >
            Change Password
          </Button>
        </form>
      )}
      {
        <Typography color="error" variant="subtitle1">
          {error}
        </Typography>
      }
    </Paper>
  );
};

export default withStyles(styles)(ResetPasswordPage);
