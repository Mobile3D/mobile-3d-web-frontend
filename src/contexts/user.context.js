import React from 'react';

export const user = { authorized: false }
export const UserContext = React.createContext(user);

export function checkAuth() {
  if (window.localStorage.getItem('token') === null || window.sessionStorage.getItem('token') === null) {
    window.location.reload();
  }
}