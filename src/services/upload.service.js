import { apiHelper } from '../helpers/api.helper';

export const uploadService = {
  getAll,
  get
};

async function getAll() {
  return fetch(apiHelper.getUrl() + '/users', {
    headers: apiHelper.getHeaders(),
  })
  .then(res => res.json());
}

async function get(id) {
  return fetch(apiHelper.getUrl() + '/users/' + id, {
    headers: apiHelper.getHeaders()
  })
  .then(res => res.json());
}