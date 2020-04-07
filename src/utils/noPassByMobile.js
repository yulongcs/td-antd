function noPassByMobile(str = '') {
  const reg = getRegExp('^(\d{3})\d{4}(\d{4})$');

  return str.replace(reg, '$1****$2');
}

export default noPassByMobile;
