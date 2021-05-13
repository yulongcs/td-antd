function noPassByInfo(v = '') {
  // 邮箱
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
  }

  // 手机号、身份证
  if (/^[0-9Xx]*$/.test(v)) {
    if (v.length <= 11) {
      const reg = /(\d{3})\d*(\d{4})/;
      return v.replace(reg, '$1****$2');
    }

    const reg = /(\d{4})\d*(\d{4})/;
    return v.replace(reg, '$1***********$2');
  }

  // 姓名
  if (v.length <= 3) {
    return `*${v.substring(1, v.length)}`;
  } else if (v.length > 3 && v.length <= 6) {
    return `**${v.substring(2, v.length)}`;
  } else if (v.length > 6) {
    return `${v.substring(0, 2)}****${v.substring(6, v.length)}`;
  }
}

export default noPassByInfo;
