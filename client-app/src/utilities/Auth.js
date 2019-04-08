import jwtDecode from 'jwt-decode';

const localStorageTokenKey = 'id_token';

export const handleAuthentication = token => {
  localStorage.setItem(localStorageTokenKey, token);
};

export const getIdToken = () => localStorage.getItem(localStorageTokenKey);

export const isAuthenticated = () => {
  const token = getIdToken();
  if (!token) return false;

  const { exp, email_verified } = jwtDecode(token);
  if (!exp || !email_verified) return false;

  const currentTime = new Date().getTime();
  const tokenIsCurrent = currentTime < exp * 1000;
  return tokenIsCurrent && email_verified;
};

export const logout = () => {
  localStorage.removeItem(localStorageTokenKey);
};

export const getProfile = () => {
  const token = getIdToken();
  if (!token) return null;
  const {
    name,
    email,
    museum_name: museumName,
    museum_id: museumId,
  } = jwtDecode(token);
  return { name, email, museumName, museumId };
};

export const userInRole = roles => {
  const token = getIdToken();
  if (!token) return false;

  const { roles: rolesInToken } = jwtDecode(token);
  if (!rolesInToken || !rolesInToken.length) return false;
  if (Array.isArray(rolesInToken)) {
    return roles.some(r =>
      rolesInToken.some(rit => r.toLowerCase() === rit.toLowerCase()),
    );
  }

  return roles.some(r => r.toLowerCase() === rolesInToken.toLowerCase());
};
