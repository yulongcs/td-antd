function toThousands(v) {
  if (typeof +v === 'number' && !isNaN(v) ) {
    return `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  } else {
    try {
      return v.replace(/\$\s?|(,*)/g, '');
    } catch (e) {
      throw new TypeError('参数不正确');
    }
  }
}

export default toThousands;