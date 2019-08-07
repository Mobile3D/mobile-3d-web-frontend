import { apiHelper } from '../helpers/api.helper';

export const userService = {
  login,
  lookup
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