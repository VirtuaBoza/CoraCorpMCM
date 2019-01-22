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
    if (!exp || !email_confirmed) return false;

    const currentTime = new Date().getTime();
    const tokenIsCurrent = currentTime < exp * 1000;
    const emailIsConfirmed = email_confirmed.toLowerCase() === 'true';
    return tokenIsCurrent && emailIsConfirmed;
  };

  logout = () => {
    localStorage.removeItem('id_token');
  };
}
