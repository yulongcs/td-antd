function toThousands(v = 0, decimal) {
  if (typeof +v === 'number' && !isNaN(v) ) {
    const str = `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    if (decimal) {
      const arr = str.split('.');
      arr[1] = (`.${arr[1] || ''}`).padEnd(decimal + 1, 0);
      return arr.join('');
    }
    return str;
  } else {
    try {
      return +v.replace(/\$\s?|(,*)/g, '');
    } catch (e) {
      throw new TypeError(e);
    }
  }
}

export default toThousands;