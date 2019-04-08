import { get, post, put } from '../utilities/http';

export const getItems = () => {
  return get('/api/collection/items').catch(() => {
    return [];
  });
};

export const getItem = id => {
  return get(`/api/collection/items/${id}`);
};

export const createItem = item => {
  return post('/api/collection/items', item);
};

export const updateItem = item => {
  return put(`/api/collection/items/${item.id}`, item);
};
