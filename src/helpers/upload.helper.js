export function checkFile(file) {
  if (file.size % 4096 !== 0 && file.size !== 0 && file.name.indexOf('.') !== -1) {
    
    let parts = file.name.split('.');
    let fileEnding = parts[parts.length - 1].toLowerCase();

    if(fileEnding === 'gcode' || fileEnding === 'gco' || fileEnding === 'gc' || fileEnding === 'g') {
      return true;
    }

    return false;
  }
}