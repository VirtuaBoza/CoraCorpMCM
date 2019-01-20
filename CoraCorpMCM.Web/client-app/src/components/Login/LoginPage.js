import React, { Component } from 'react';
import login from '../../services/loginService';

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      credentials: {
        email: '',
        password: '',
      },
      errors: [],
    };
  }

  handleInputChanged = e => {
    this.setState({
      ...this.state,
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value,
      },
    });
  };

  handleSubmitClicked = e => {
    e.preventDefault();
    this.setState({ ...this.state, errors: [] });

    login(this.state.credentials)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const { credentials } = this.state;
    return (
      <>
        <form>
          <input
            name="email"
            value={credentials.email}
            onChange={this.handleInputChanged}
            placeholder="email"
            type="email"
          />
          <input
            name="password"
            value={credentials.password}
            onChange={this.handleInputChanged}
            placeholder="password"
            type="password"
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
