export const filesHelper = {
  setNextFile,
};

function setNextFile(id, name) {
  window.sessionStorage.setItem('print_file_id', id);
  window.sessionStorage.setItem('print_file_name', name);
}