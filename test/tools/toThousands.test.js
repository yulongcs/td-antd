import toThousands from '../../src/tools/toThousands';

describe('toThousands', () => {
  const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

  // 入参是整数
  it('test params-1 is a integer', () => {
    expect(toThousands(123456)).toBe('123,456');
  });

  // 入参是字符串整数
  it('test params-1 is a string integer', () => {
    expect(toThousands('123456')).toBe('123,456');
  });

  // 入参是小于一千的整数
  it('test params-1 is a integer less than 1000', () => {
    expect(toThousands(123)).toBe('123');
  });

  // 入参是小于一千的字符串整数
  it('test params-1 is a string integer less than 1000', () => {
    expect(toThousands('123')).toBe('123');
  });

  // 入参是整数，且小数位需要显示3位
  it('test params-1 is a integer and params-2 is 3', () => {
    expect(toThousands(123456, 3)).toBe('123,456.000');
  });

  // 入参是小于一千的整数，且小数位需要显示2位
  it('test params-1 is a integer less than 1000 and params-2 is 2', () => {
    expect(toThousands(123, 2)).toBe('123.00');
  });

  // 入参是有小数的数字
  it('test params-1 is a decimal number', () => {
    expect(toThousands(410.1234)).toBe('410.1234');
  });

  // 入参是有小数的数字，且小数点位数比参数大
  it('test params-1 is a decimal number and decimal less greater than params-2', () => {
    expect(toThousands(410.123, 2)).toBe('410.123');
  });

  // 入参是人民币字符串
  it('test params-1 is a string rmb', () => {
    expect(toThousands('123,222.123')).toBe(123222.123);
  });

  // 人民币展示-示例1
  it('show RMB', () => {
    expect(toThousands.currency('123222.123')).toBe('￥123,222.123');
  });

  // 人民币展示-示例2
  it('show RMB 2', () => {
    expect(toThousands.currency(123222)).toBe('￥123,222.00');
  });

  // 入参不是字符串数字
  it('test params is not a number/string', () => {
    const num = toThousands({});

    expect(errorSpy.mock.calls[0][0]).toMatch('Warning: [toThousands] Parameter type error');
    expect(num).toBeFalsy();
  });
});
