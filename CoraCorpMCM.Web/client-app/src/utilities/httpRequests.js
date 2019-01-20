import Auth from '../Auth';

const handleResponse = async response => {
  if (response.ok) return response.json();
  const contentType = response.headers.get('content-type');
  let failedResponse;
  try {
    if (contentType && contentType.indexOf('application/json') !== -1) {
      failedResponse = await response.json();
    } else {
      failedResponse = await response.text();
    }
  } catch (error) {
    console.error(error);
  }
  throw failedResponse;
};

const handleRejection = error => console.error(error);

const configureOptions = (verb, payload) => {
  let options = {
    method: verb || 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  if (payload) {
    options = { ...options, body: JSON.stringify(payload) };
  }

  const token = new Auth().retrieveToken();
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

export const get = url => {
  const options = configureOptions();
  return makeRequest(url, options);
};

export const post = (url, payload) => {
  const options = configureOptions('POST', payload);
  return makeRequest(url, options);
};

export const put = (url, payload) => {
  const options = configureOptions('PUT', payload);
  return makeRequest(url, options);
};
