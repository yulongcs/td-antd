import toThousands from '../../src/tools/toThousands';

test('test params is a number', () => {
  expect(toThousands(123456)).toEqual('123,456');
});

test('test params is a number and params2 is a 2', () => {
  expect(toThousands(123456, 2)).toEqual('123,456.00');
});

test('test params is a Object', () => {
  expect(toThousands({})).toEqual('the toThousands Parameter type error');
});
