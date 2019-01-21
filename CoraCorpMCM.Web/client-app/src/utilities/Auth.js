import jwtDecode from 'jwt-decode';

export default class Auth {
  storeToken = token => {
    localStorage.setItem('id_token', token);
  };

  retrieveToken = () => localStorage.getItem('id_token');

  isAuthenticated = () => {
    const token = this.retrieveToken();
    if (!token) return false;
    const { exp, email_confirmed } = jwtDecode(token);
    return new Date().getTime() < exp && email_confirmed;
  };
}
