import React from 'react';
import io from 'socket.io-client';

export const socket = io('http://' + window.location.host.split(':')[0] + ':4000', {
  query: {
    token: 'Bearer ' + window.localStorage.getItem('token')
  }
});
export const SocketContext = React.createContext(socket);