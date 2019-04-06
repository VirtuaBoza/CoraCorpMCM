const handleResponse = async response => {
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    if (response.ok) {
      return response.json();
    }

    throw await response.json();
  }

  if (response.ok) {
    return response.text();
  }

  throw await response.text();
};

const handleRejection = error => console.error(error);

const configureOptions = (auth, verb, payload) => {
  let options = {
    method: verb || 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  if (payload) {
    options = { ...options, body: JSON.stringify(payload) };
  }

  const token = auth && auth.getIdToken();
  if (token) {
    options = {
      ...options,
      headers: { ...options.headers, Authorization: `Bearer ${token}` },
    };
  }
  return options;
};

const makeRequest = (url, options) => {
  return fetch(url, options)
    .catch(handleRejection)
    .then(handleResponse);
};

export default class Http {
  constructor(auth) {
    this.auth = auth;
  }

  get = url => {
    const options = configureOptions(this.auth);
    return makeRequest(url, options);
  };

  post = (url, payload) => {
    const options = configureOptions(this.auth, 'POST', payload);
    return makeRequest(url, options);
  };

  put = (url, payload) => {
    const options = configureOptions(this.auth, 'PUT', payload);
    return makeRequest(url, options);
  };
}
