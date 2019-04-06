import Http from '../utilities/Http';

const register = ({
  museumName,
  username,
  email,
  password,
  confirmPassword,
}) => {
  const http = new Http();
  return http
    .post('/api/account/registration', {
      museumName,
      username,
      email,
      password,
      confirmPassword,
    })
    .catch(err => {
      console.error(err);
      throw err.errors;
    });
};

export default register;
