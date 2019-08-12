import { apiHelper } from '../helpers/api.helper';

export const userService = {
  login,
  lookup,
  add,
  getAll,
  get,
  remove
};

async function login(body) {
  return fetch(apiHelper.getUrl() + '/auth/login', {
    method: 'POST',
    headers: apiHelper.getDefaultHeaders(),
    body: JSON.stringify(body)
  })
  .then(res => res.json());
}

async function lookup() {
  return fetch(apiHelper.getUrl() + '/user', {
    headers: apiHelper.getHeaders(),
  })
  .then(res => res.json());
}

async function add(body) {
  return fetch(apiHelper.getUrl() + '/users', {
    method: 'POST',
    headers: apiHelper.getHeaders(),
    body: JSON.stringify(body)
  })
  .then(res => res.json());
}

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

async function remove(id) {
  return fetch(apiHelper.getUrl() + '/users/' + id, {
    method: 'DELETE',
    headers: apiHelper.getHeaders()
  })
  .then(res => res.json());
}