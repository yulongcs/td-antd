import toThousands from '../../src/tools/toThousands';

// 入参是数字
test('test params is a number', () => {
  expect(toThousands(123456)).toEqual('123,456');
});

// 入参是数字和小数点位数
test('test params is a number and params2 is 2', () => {
  expect(toThousands(123456, 2)).toEqual('123,456.00');
});

// 入参不是字符串或数字
test('test params is not a number/string', () => {
  expect(toThousands({})).toEqual('the toThousands Parameter type error');
});

// 入参是字符串
test('test params is a string', () => {
  expect(toThousands('12345.1')).toEqual('12,345.1');
});

// 入参是字符串和小数点位数
test('test params is a string and params2 is 2', () => {
  expect(toThousands('12345.1', 2)).toEqual('12,345.10');
});

// 入参是千位符分割的字符串
test('test params is a currency string', () => {
  expect(toThousands('123,456')).toEqual(123456);
});

// 入参是千位符分割的字符串
test('test currency', () => {
  expect(toThousands.currency(12345)).toEqual('￥12,345.00');
});
