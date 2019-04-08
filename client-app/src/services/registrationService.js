import { post } from '../utilities/http';

const register = ({
  museumName,
  username,
  email,
  password,
  confirmPassword,
}) => {
  return post('/api/account/registration', {
    museumName,
    username,
    email,
    password,
    confirmPassword,
  }).catch(err => {
    console.error(err);
    throw err.errors;
  });
};

export default register;
