import { post } from '../utilities/http';

const authenticationService = {
  login: ({ email, password }) => {
    return post('/api/account/authentication/login', { email, password });
  },
  forgotPassword: email => {
    return post('/api/account/authentication/forgotPassword', email);
  },
  changePassword: ({ email, password, confirmPassword, code }) => {
    return post('/api/account/authentication/changePassword', {
      email,
      password,
      confirmPassword,
      code,
    });
  },
};

export default authenticationService;
