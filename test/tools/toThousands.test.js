import toThousands from '../../src/tools/toThousands';

describe('toThousands', () => {
  const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

  // 入参是数字
  it('test params is a number', () => {
    expect(toThousands(123456)).toBe('123,456');
  });

  // 入参是数字和小数点位数
  test('test params is a number and params2 is 2', () => {
    expect(toThousands(123456, 2)).toBe('123,456.00');
  });

  // 入参不是字符串数字
  test('test params is not a number/string', () => {
    const num = toThousands({});

    expect(errorSpy.mock.calls[0][0]).toMatch('Warning: [toThousands] Parameter type error');
    expect(num).toBeFalsy();
  });

  // 入参是字符串
  test('test params is a string', () => {
    expect(toThousands('12345.1')).toBe('12,345.1');
  });

  // 入参是字符串和小数点位数
  test('test params is a string and params2 is 2', () => {
    expect(toThousands('12345.1', 2)).toBe('12,345.10');
  });

  // 入参是千位符分割的字符串
  test('test params is a currency string', () => {
    expect(toThousands('123,456')).toBe(123456);
  });

  // 入参是千位符分割的字符串
  test('test currency', () => {
    expect(toThousands.currency(12345)).toBe('￥12,345.00');
  });
});
