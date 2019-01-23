import Http from '../utilities/Http';

const login = ({ email, password }) => {
  const http = new Http();
  return http.post('/api/account/authentication', { email, password });
};

export default login;
