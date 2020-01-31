import io from 'socket.io-client';

const socket = io('http://' + window.location.host.split(':')[0] + ':4000', {
  query: {
    token: 'Bearer ' + window.localStorage.getItem('token')
  }
});

/* Subscribers */

export function subscribeToInfo(cb) {
  socket.on('info', info => cb(info));
}

export function subscribeToStatus(cb) {
  socket.on('status', status => cb(status));
}

export function subscribeToProgress(cb) {
  socket.on('progress', progress => cb(progress));
}

export function subscribeToTemperature(cb) {
  socket.on('temperature', temperature => cb(temperature));
}

export function subscribeToConsoleLog(cb) {
  socket.on('consoleLog', consoleLog => cb(consoleLog));
}

export function subscribeToNewFileToPrint(cb) {
  socket.on('newFileToPrint', file => cb(file));
}

export function subscribeToDeleteLoadedFile(cb) {
  socket.on('deleteLoadedFile', () => cb());
}

/* Emitters */

export function emitMoveDirection(direction, length) {
  socket.emit(direction, length);
}

export function emitSendManualCommand(command) {
  socket.emit('sendManualCommand', command);
}

export function emitFanOn(speed) {
  socket.emit('fanOn', speed);
}

export function emitFanOff() {
  socket.emit('fanOff');
}

export function emitExtrude(length) {
  socket.emit('extrude', length);
}

export function emitRetract(length) {
  socket.emit('retract', length);
}

export function emitSetHotendTemperature(temp) {
  socket.emit('setHotendTemperature', temp);
}

export function emitSetHeatbedTemperature(temp) {
  socket.emit('setHeatbedTemperature', temp);
}

export function emitGetInfo() {
  socket.emit('getInfo');
}

export function emitPrintFile(file_id) {
  socket.emit('printFile', file_id);
}

export function emitDeleteLoadedFile() {
  socket.emit('deleteLoadedFile');
}

export function emitPausePrint() {
  socket.emit('pausePrint');
}

export function emitUnpausePrint() {
  socket.emit('unpausePrint');
}

export function emitCancelPrint() {
  socket.emit('cancelPrint');
}

export function emitLoadFile(data) {
  socket.emit('loadFile', data);
}

/* Unsubscribers */

export function unsubscribeFromInfo() {
  socket.off('info');
}

export function unsubscribeFromStatus() {
  socket.off('status');
}

export function unsubscribeFromProgress() {
  socket.off('progress');
}

export function unsubscribeFromTemperature() {
  socket.off('temperature');
}

export function unsubscribeFromConsoleLog() {
  socket.off('consoleLog');
}

export function unsubscribeFromNewFileToPrint() {
  socket.off('newFileToPrint');
}

export function unsubscribeFromDeleteLoadedFile() {
  socket.off('deleteLoadedFile');
}