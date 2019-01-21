import { post } from '../utilities/httpRequests';

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
  })
    .then(stuff => {
      console.log(stuff);
    })
    .catch(err => {
      throw err.errors;
    });
};

export default register;
