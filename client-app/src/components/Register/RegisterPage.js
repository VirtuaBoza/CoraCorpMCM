import React, { useState } from 'react';
import isEmail from 'validator/lib/isEmail';

import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import register from '../../services/registrationService';

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
  form: {
    marginTop: theme.spacing.unit,
    width: '100%',
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

const RegisterPage = ({ classes }) => {
  const [registrationModel, setRegistrationModel] = useState({
    museumName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [formErrors, setFormErrors] = useState({
    museumName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [complete, setComplete] = useState(false);

  if (complete)
    return (
      <div>
        Thank you for registering. You should receive an account verification
        email soon. Your email must be verified before you can begin using the
        system.
      </div>
    );

  const handleInputChanged = e => {
    const { name, value } = e.target;

    setRegistrationModel({
      ...registrationModel,
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
            email: isEmail(value) ? '' : 'Please enter a valid email address.',
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
              registrationModel.confirmPassword.length > 0 &&
              value !== registrationModel.confirmPassword
                ? 'Password fields must match.'
                : '',
          });
          break;
        case 'confirmPassword':
          setFormErrors({
            ...formErrors,
            confirmPassword:
              value !== registrationModel.password
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
    setProcessing(true);
    register(registrationModel)
      .then(() => {
        setProcessing(false);
        setComplete(true);
      })
      .catch(errors => {
        if (Array.isArray(errors)) {
          setErrors({ errors });
        }
        setProcessing(false);
      });
  };

  const formIsValid = () => {
    const noFormErrors = Object.getOwnPropertyNames(formErrors).every(
      objProp => formErrors[objProp] === '',
    );
    const requiredFieldsArePopulated = [
      registrationModel.museumName,
      registrationModel.username,
      registrationModel.email,
      registrationModel.password,
      registrationModel.confirmPassword,
    ].every(value => {
      return !/^ *$/.test(value);
    });
    return noFormErrors && requiredFieldsArePopulated;
  };

  return (
    <Paper className={classes.formContainer}>
      <Typography component="h1" variant="h5">
        Register
      </Typography>
      <form className={classes.form}>
        <TextField
          name="museumName"
          value={registrationModel.museumName}
          onChange={handleInputChanged}
          onBlur={validateField}
          label="Museum Name"
          helperText={formErrors.museumName || ' '}
          error={Boolean(formErrors.museumName)}
          margin="normal"
          autoComplete="organization"
          variant="outlined"
          autoFocus
          fullWidth
          required
        />
        <TextField
          name="username"
          value={registrationModel.username}
          onChange={handleInputChanged}
          onBlur={validateField}
          label="Your Name"
          helperText={formErrors.username || ' '}
          error={Boolean(formErrors.username)}
          margin="normal"
          autoComplete="name"
          variant="outlined"
          fullWidth
          required
        />
        <TextField
          name="email"
          value={registrationModel.email}
          onChange={handleInputChanged}
          onBlur={validateField}
          label="Email"
          type="email"
          helperText={formErrors.email || ' '}
          error={Boolean(formErrors.email)}
          margin="normal"
          autoComplete="work email"
          variant="outlined"
          fullWidth
          required
        />
        <TextField
          name="password"
          onChange={handleInputChanged}
          onBlur={validateField}
          value={registrationModel.password}
          label="Password"
          type="password"
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
          onChange={handleInputChanged}
          onBlur={validateField}
          value={registrationModel.confirmPassword}
          label="Confirm Password"
          type="password"
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
          Register
        </Button>
        <div>{processing && 'Processing...'}</div>
        <ul>
          {errors.map((error, i) => (
            <li key={i}>{error.description}</li>
          ))}
        </ul>
      </form>
    </Paper>
  );
};

export default withStyles(styles)(RegisterPage);
