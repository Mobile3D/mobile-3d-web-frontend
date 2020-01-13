import { printerService } from '../services/printer.service';

export const filesHelper = {
  setNextFile,
};

function setNextFile(id, name) {
  window.sessionStorage.setItem('print_file_id', id);
  window.sessionStorage.setItem('print_file_name', name);
  printerService.setLoadedFile({
    id: id,
    name: name
  });
}