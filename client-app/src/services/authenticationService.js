import Http from '../utilities/Http';

const authenticationService = {
  login: ({ email, password }) => {
    const http = new Http();
    return http.post('/api/account/authentication/login', { email, password });
  },
  forgotPassword: email => {
    const http = new Http();
    return http.post('/api/account/authentication/forgotPassword', email);
  },
  changePassword: ({ email, password, confirmPassword, code }) => {
    const http = new Http();
    return http.post('/api/account/authentication/changePassword', {
      email,
      password,
      confirmPassword,
      code,
    });
  },
};

export default authenticationService;
