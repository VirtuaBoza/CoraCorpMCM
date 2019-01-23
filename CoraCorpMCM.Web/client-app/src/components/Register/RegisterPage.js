import React, { Component } from 'react';
import Isemail from 'isemail';

import FormTextInput from '../Shared/FormTextInput';

import register from '../../services/registrationService';

class RegisterPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      registrationModel: {
        museumName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
      formErrors: {
        museumName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
      errors: [],
      processing: false,
      complete: false,
    };
  }

  handleInputChanged = e => {
    const { name, value } = e.target;

    const registrationModel = {
      ...this.state.registrationModel,
      [name]: value,
    };

    const formErrors = this.validateField(e);

    this.setState({ registrationModel, formErrors });
  };

  validateField = e => {
    const { name, value, required } = e.target;
    const { registrationModel, formErrors } = this.state;

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
        case 'password':
          return {
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
          };
        case 'confirmPassword':
          return {
            ...formErrors,
            confirmPassword:
              value !== registrationModel.password
                ? 'Password fields must match.'
                : '',
          };
        default:
          return { ...formErrors };
      }
    }
  };

  handleSubmitClicked = e => {
    e.preventDefault();
    this.setState({ processing: true });
    register(this.state.registrationModel)
      .then(() => {
        this.setState({ processing: false, complete: true });
      })
      .catch(errors => {
        if (Array.isArray(errors)) {
          this.setState({ errors });
        }
        this.setState({ processing: false });
      });
  };

  formIsValid = () => {
    const { formErrors, registrationModel } = this.state;
    const noFormErrors = Object.getOwnPropertyNames(formErrors).every(
      objProp => this.state.formErrors[objProp] === '',
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

  render() {
    const { registrationModel, formErrors, errors, complete } = this.state;

    if (!complete) {
      return (
        <form>
          <FormTextInput
            name="museumName"
            value={registrationModel.museumName}
            onChange={this.handleInputChanged}
            label="Museum Name"
            type="text"
            validationText={formErrors.museumName}
            required
          />
          <FormTextInput
            name="username"
            value={registrationModel.username}
            onChange={this.handleInputChanged}
            label="Your Name"
            type="text"
            validationText={formErrors.username}
            required
          />
          <FormTextInput
            name="email"
            value={registrationModel.email}
            onChange={this.handleInputChanged}
            label="Email"
            type="email"
            validationText={formErrors.email}
            required
          />
          <FormTextInput
            name="password"
            onChange={this.handleInputChanged}
            value={registrationModel.password}
            label="Password"
            type="password"
            validationText={formErrors.password}
            required
          />
          <FormTextInput
            name="confirmPassword"
            onChange={this.handleInputChanged}
            value={registrationModel.confirmPassword}
            label="Confirm Password"
            type="password"
            validationText={formErrors.confirmPassword}
            required
          />
          <div>
            <input
              type="submit"
              value="Submit"
              onClick={this.handleSubmitClicked}
              disabled={!this.formIsValid()}
            />
          </div>
          <div>{this.state.processing && 'Processing...'}</div>
          <ul>
            {errors.map((error, i) => (
              <li key={i}>{error.description}</li>
            ))}
          </ul>
        </form>
      );
    }

    return (
      <div>
        Thank you for registering. You should receive an account verification
        email soon. Your email must be verified before you can begin using the
        system.
      </div>
    );
  }
}

export default RegisterPage;
