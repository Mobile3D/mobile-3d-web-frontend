import { apiHelper } from '../helpers/api.helper';

export const userService = {
  getStatus,
  getProgress
};

async function getStatus() {
  return fetch(apiHelper.getUrl() + '/printer/status', {
    headers: apiHelper.getHeaders()
  })
  .then(res => res.json());
}

async function getProgress() {
  return fetch(apiHelper.getUrl() + '/printer/progress', {
    headers: apiHelper.getHeaders()
  })
  .then(res => res.json());
}