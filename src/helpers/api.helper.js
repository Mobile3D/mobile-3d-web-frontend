export const apiHelper = {
  getUrl,
  getDefaultHeaders,
  getHeaders,
  getFileUploadHeaders,
  checkToken,
  checkAuth
};

function getUrl() {
  return 'http://192.168.103.92:4000/api/v1';
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

    if (data.error.code === 'ER_INVALID_LOGIN') {
      return {
        valid: false,
        type: 'error',
        message: 'Your username or password is invalid.'
      };
    } else if (data.error.code === 'ER_USERNAME_TAKEN') {
      return {
        valid: false,
        type: 'error',
        message: 'The username you entered is already taken.'
      };
    } else if (data.error.code === 'ER_MISSING_PARAMS') {
      return {
        valid: false,
        type: 'error',
        message: 'Some parameters are missing.'
      };
    } else if (data.error.code === 'ER_INTERNAL') {
      return {
        valid: false,
        type: 'error',
        message: 'An internal error occured. Please try again in a few seconds.'
      };
    } else if (data.error.code === 'ER_TOO_MANY_REQUESTS') {
      return {
        valid: false,
        type: 'error',
        message: 'Too many requests. Please wait a few seconds and try again.'
      };
    } else {
      return {
        valid: false,
        type: 'error',
        message: 'An unknown error occured.'
      };
    }
  }
}