import delay from '../../src/tools/delay';

describe('delay', () => {
  // 测试异常抛出
  test('compiling android goes as expected', () => {
    expect(delay).toThrow('Warning: [delay] Expected a function');
  });

  // 测试回调函数
  test('test callback', () => {
    delay((res) => {
      expect(res).toBe('later2');
    }, 3, 'later');
  })
});
