function toThousands(v = 0, figures) {
  if (typeof +v === 'number' && !isNaN(v) ) {
    const arr = `${v}`.split('.'); // 将数字进行整数位和小数位的分隔
    const integer = arr[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    const decimal = (figures || arr[1]) && (arr[1] || '').padEnd(figures, 0);

    return decimal ? `${integer}.${decimal}` : integer;
  } else {
    try {
      return +v.replace(/\$\s?|(,*)/g, '');
    } catch (e) {
      console.error(`Warning: [toThousands] Parameter type error`);
      return false;
    }
  }
}

// 显示人民币的展示金额
const currency = (number) => {
  return `￥${toThousands(number, 2)}`;
};

toThousands.currency = currency;

export default toThousands;
