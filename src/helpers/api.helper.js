export const apiHelper = {
  getUrl,
  getDefaultHeaders,
  getHeaders,
  checkToken,
};

function getUrl() {
  return 'http://localhost:4000/api/v1';
}

function getDefaultHeaders() {
  return {
    'Content-Type': 'application/json',
  }
}

function getHeaders() {
  return {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + window.localStorage.getItem('token'),
  }
}

function checkToken(error) {
  if (error.code === 'ER_TOKEN_EXPIRED') {
    window.location.reload();
  }
}