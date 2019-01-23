import Http from '../utilities/Http';

const getItems = auth => {
  const http = new Http(auth);
  return http.get('/api/collection/item').catch(() => {
    return [];
  });
};

export default getItems;
