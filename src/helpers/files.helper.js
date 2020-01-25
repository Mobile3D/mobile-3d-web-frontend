import { printerService } from '../services/printer.service';

export const filesHelper = {
  setNextFile,
  getSize
};

function setNextFile(id, name) {
  window.sessionStorage.setItem('print_file_id', id);
  window.sessionStorage.setItem('print_file_name', name);
  printerService.setLoadedFile({
    id: id,
    name: name
  });
}

function getSize(size) {
  if (parseInt(size/1024/1024/1024) > 0) return {size: parseInt(size/1024/1024/1024), unit: 'GB'};
  else if (parseInt(size/1024/1024) > 0) return {size: parseInt(size/1024/1024), unit: 'MB'};
  else if (parseInt(size/1024) > 0) return {size: parseInt(size/1024), unit: 'KB'};
  else return {size: parseInt(size), unit: 'Bytes'};
}