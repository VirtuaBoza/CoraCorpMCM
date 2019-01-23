import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Isemail from 'isemail';

import FormTextInput from '../Shared/FormTextInput';

import login from '../../services/loginService';

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      credentials: {
        email: '',
        password: '',
      },
      formErrors: {
        email: '',
        password: '',
      },
      errors: [],
      processing: false,
    };
  }

  handleInputChanged = e => {
    const { name, value } = e.target;

    const credentials = {
      ...this.state.credentials,
      [name]: value,
    };

    const formErrors = this.validateField(e);

    this.setState({ credentials, formErrors });
  };

  validateField = e => {
    const { name, value, required } = e.target;
    const { formErrors } = this.state;

    if (required && /^ *$/.test(value)) {
      return {
        ...formErrors,
        [name]: 'This field is required.',
      };
    } else {
      switch (name) {
        case 'email':
          return {
            ...formErrors,
            email: Isemail.validate(value)
              ? ''
              : 'Please enter a valid email address.',
          };
        default:
          return { ...formErrors };
      }
    }
  };

  handleSubmitClicked = e => {
    e.preventDefault();
    this.setState({ processing: true });

    const { credentials } = this.state;
    const { auth, location, history } = this.props;

    login(credentials)
      .then(json => {
        auth.storeToken(json.token);
        if (location.state && location.state.referrer) {
          history.push(this.props.location.state.referrer);
        } else {
          history.push('/');
        }
      })
      .catch(err => {
        this.setState({ processing: false });
        console.error(err);
      });
  };

  render() {
    if (this.props.auth.isAuthenticated()) return <Redirect to="/" />;
    const { credentials, formErrors } = this.state;
    return (
      <>
        <form>
          <FormTextInput
            name="email"
            value={credentials.email}
            onChange={this.handleInputChanged}
            label="Email"
            type="email"
            validationText={formErrors.email}
            required
          />
          <FormTextInput
            name="password"
            value={credentials.password}
            onChange={this.handleInputChanged}
            label="Password"
            type="password"
            validationText={formErrors.email}
            required
          />
          <input
            type="submit"
            value="Submit"
            onClick={this.handleSubmitClicked}
          />
        </form>
      </>
    );
  }
}

export default LoginPage;
