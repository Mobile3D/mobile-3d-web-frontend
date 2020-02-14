export const apiHelper = {
  getUrl,
  getFileUrl,
  getDefaultHeaders,
  getHeaders,
  getFileUploadHeaders,
  checkToken,
  checkAuth
};

function getUrl() {
  return 'http://' + window.location.host.split(':')[0] + '/api/v1';
}

function getFileUrl() {
  return 'http://' + window.location.host.split(':')[0] + '/files';
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

function getFileUploadHeaders() {
  return {
    'Authorization': 'Bearer ' + window.localStorage.getItem('token'),
  }
}

function checkToken(error) {
  if (error.code === 'ER_TOKEN_EXPIRED') {
    window.location.reload();
  }
}

function checkAuth() {
  if (window.localStorage.getItem('token') !== null || window.sessionStorage.getItem('token') !== null) {
    return true;
  } 
  return false;
}

export function checkResponse(data) {
  if (data.error === undefined) return { valid: true };
  else {

    if (data.error.code === 'ER_MISSING_PARAMS') {
      return {
        valid: false,
        type: 'error',
        message: 'Some parameters are missing.'
      };
    } else if (data.error.code === 'ER_USERNAME_TAKEN') {
      return {
        valid: false,
        type: 'error',
        message: 'The username you entered is already taken.'
      };
    } else if (data.error.code === 'ER_USER_NOT_FOUND') {
      return {
        valid: false,
        type: 'error',
        message: 'The requested user could not be found.'
      };
    } else if (data.error.code === 'ER_INVALID_LOGIN') {
      return {
        valid: false,
        type: 'error',
        message: 'Your username or password is invalid.'
      };
    } else if (data.error.code === 'ER_UNAUTHORIZED') {
      return {
        valid: false,
        type: 'error',
        message: 'You need to be signed in to use this service.'
      };
    } else if (data.error.code === 'ER_TOKEN_EXPIRED') {
      return {
        valid: false,
        type: 'error',
        message: 'This session expired. Please reload the page and sign in again.'
      };
    } else if (data.error.code === 'ER_UPLOAD_NOT_FOUND') {
      return {
        valid: false,
        type: 'error',
        message: 'The requested upload could not be found. Please try to reload the page.'
      };
    } else if (data.error.code === 'ER_USER_TO_DELETE_SIGNED_IN') {
      return {
        valid: false,
        type: 'error',
        message: 'You cannot delete yourself.'
      };
    } else if (data.error.code === 'ER_TOO_MANY_REQUESTS') {
      return {
        valid: false,
        type: 'error',
        message: 'Too many requests. Please wait a few seconds and try again.'
      };
    } else if (data.error.code === 'ER_INTERNAL') {
      return {
        valid: false,
        type: 'error',
        message: 'An internal error occured. Please try again in a few seconds.'
      };
    } else {
      return {
        valid: false,
        type: 'error',
        message: 'An unknown error occured. Please try to reload the page.'
      };
    }
  }
}