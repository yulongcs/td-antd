function noPassByInfo(v = '') {
  if (String (v).indexOf ('@') > 0) {
    const str = v.split('@');
    const length = str[0].length;
    let s = '';

    if (length > 3) {
      s = str[0].substr(0, 3);
      s += new Array(length - 2).join('*');
    } else {
      s = str[0].substr(0, 1);
      s += new Array(length).join('*');
    }
    return `${s}@${str[1]}`;
  } else {
    const reg = /(\d{3})\d*(\d{4})/;

    return v.replace(reg, '$1****$2');
  }
}

export default noPassByInfo;
