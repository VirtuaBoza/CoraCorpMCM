import jwtDecode from 'jwt-decode';

export default class Auth {
  constructor(history) {
    this.history = history;
    this.userProfile = null;
  }

  storeToken = token => {
    localStorage.setItem('id_token', token);
  };

  getIdToken = () => localStorage.getItem('id_token');

  isAuthenticated = () => {
    const token = this.getIdToken();
    if (!token) return false;

    const { exp, email_verified } = jwtDecode(token);
    if (!exp || !email_verified) return false;

    const currentTime = new Date().getTime();
    const tokenIsCurrent = currentTime < exp * 1000;
    return tokenIsCurrent && email_verified;
  };

  logout = () => {
    localStorage.removeItem('id_token');
    this.userProfile = null;
    this.history.push('/');
  };

  getProfile = () => {
    if (this.userProfile) return this.userProfile;
    const token = this.getIdToken();
    if (!token) return null;
    const { name, email, museum_name: museumName } = jwtDecode(token);
    this.profile = { name, email, museumName };
    return { ...this.profile };
  };

  userInRole = role => {
    const token = this.getIdToken();
    if (!token) return false;

    const { roles } = jwtDecode(token);
    if (!roles || !roles.length) return false;
    if (Array.isArray(roles)) {
      return roles.some(r => r.toLowerCase() === role.toLowerCase());
    }
    return roles === role;
  };
}
