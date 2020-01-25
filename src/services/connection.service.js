import { apiHelper } from '../helpers/api.helper';

export const connectionService = {
  setConnection,
  getConnection,
  getPorts
};

async function setConnection(body) {
  return fetch(apiHelper.getUrl() + '/connection', {
    method: 'POST',
    headers: apiHelper.getHeaders(),
    body: JSON.stringify(body)
  })
  .then(res => res.json());
}

async function getConnection() {
  return fetch(apiHelper.getUrl() + '/connection', {
    headers: apiHelper.getHeaders()
  })
  .then(res => res.json());
}

async function getPorts() {
  return fetch(apiHelper.getUrl() + '/ports', {
    headers: apiHelper.getHeaders()
  })
  .then(res => res.json());
}