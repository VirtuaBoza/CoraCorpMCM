import Auth from '../Auth';
import { post } from '../utilities/httpRequests';

const login = ({ email, password }) => {
  const auth = new Auth();
  return post('/api/account/authentication', { email, password }).then(json => {
    auth.storeToken(json.token);
  });
};

export default login;
