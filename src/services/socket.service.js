import io from 'socket.io-client';

const socket = io('http://' + window.location.host.split(':')[0] + ':4000', {
  query: {
    token: 'Bearer ' + window.localStorage.getItem('token')
  }
});

export function subscribeToEvent(event, cb) {
  socket.on(event, data => cb(data));
}

export function emitEvent(event, data = null) {
  if (data === null) socket.emit(event);
  else socket.emit(event, data);
}

export function unsubscribeFromEvent(event) {
  socket.off(event);
}