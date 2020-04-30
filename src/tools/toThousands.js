function toThousands(v = 0) {
  if (typeof +v === 'number' && !isNaN(v) ) {
    return `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  } else {
    try {
      return +v.replace(/\$\s?|(,*)/g, '');
    } catch (e) {
      throw new TypeError(e);
    }
  }
}

export default toThousands;