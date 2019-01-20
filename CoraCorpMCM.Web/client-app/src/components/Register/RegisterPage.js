import React, { Component } from 'react';

class RegisterPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      registrationModel: {
        museumName: '',
        username: '',
        email: '',
        password: '',
      },
      response: null,
      processing: false,
    };
  }

  handleInputChanged = e => {
    this.setState({
      ...this.state,
      registrationModel: {
        ...this.state.registrationModel,
        [e.target.name]: e.target.value,
      },
    });
  };

  handleSubmitClicked = e => {
    e.preventDefault();
    this.setState({ ...this.state, processing: true });
  };

  render() {
    const { registrationModel } = this.state;

    return (
      <>
        <form>
          <input
            name="museumName"
            value={registrationModel.museumName}
            onChange={this.handleInputChanged}
            placeholder="Museum Name"
            type="text"
          />
          <input
            name="username"
            value={registrationModel.username}
            onChange={this.handleInputChanged}
            placeholder="Username"
            type="text"
          />
          <input
            name="email"
            value={registrationModel.email}
            onChange={this.handleInputChanged}
            placeholder="Email"
            type="email"
          />
          <input
            name="password"
            onChange={this.handleInputChanged}
            value={registrationModel.password}
            placeholder="Password"
            type="password"
          />
          <input
            type="submit"
            value="Submit"
            onClick={this.handleSubmitClicked}
          />
          {this.state.processing && 'Processing...'}
        </form>
        <div>
          {this.state.response && JSON.stringify(this.state.response, null, 2)}
        </div>
      </>
    );
  }
}

export default RegisterPage;
