import { get } from '../utilities/httpRequests';

const getItems = () => {
  return get('/api/collection/item').catch(() => {
    return [];
  });
};

export default getItems;
