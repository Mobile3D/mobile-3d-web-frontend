import { apiHelper } from '../helpers/api.helper';

export const uploadService = {
  add,
  getAll,
  get,
  remove
};

async function add(body) {
  return fetch(apiHelper.getUrl() + '/uploads', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': 'Bearer ' + window.localStorage.getItem('token'),
    },
    body: body
  })
  .then(res => res.json());
}

async function getAll() {
  return fetch(apiHelper.getUrl() + '/uploads', {
    headers: apiHelper.getHeaders(),
  })
  .then(res => res.json());
}

async function get(id) {
  return fetch(apiHelper.getUrl() + '/uploads/' + id, {
    headers: apiHelper.getHeaders()
  })
  .then(res => res.json());
}

async function remove(id) {
  return fetch(apiHelper.getUrl() + '/uploads/' + id, {
    method: 'DELETE',
    headers: apiHelper.getHeaders()
  })
  .then(res => res.json());
}