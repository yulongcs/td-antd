const ACCEPT = {
  image: 'image/*',
  jpg: 'image/jpg,image/jpeg',
  png: 'image/png',
  gif: 'image/gif',
  svg: 'image/svg+xml',
  txt: 'text/plain',
  pdf: 'application/pdf',
  zip: 'application/zip',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  excel: 'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
};

ACCEPT.toString = (arr = []) => {
  return arr.reduce((keys, item) => `${keys}${keys !== '' ? ',' : ''}${ACCEPT[item]}`, '');
};

export default ACCEPT;
