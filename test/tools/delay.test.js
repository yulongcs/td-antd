import delay from '../../src/tools/delay';

describe('delay', () => {
  // 测试异常抛出
  it('compiling android goes as expected', () => {
    expect(delay).toThrow('Warning: [delay] Expected a function');
  });

  // 测试回调函数的参数
  it('test the parmas of the callback', (done) => {
    delay((res) => {
      expect(res).toBe('later');
      done();
    }, 3, 'later');
  });

  // 测试回调函数执行
  it('test callback', (done) => {
    let number = '0';
    delay(() => {
      number = '1';
    }, 32);

    setTimeout(() => {
      expect(number).toBe('1');
      done();
    }, 64);
  });

  // 测试延迟函数被取消
  it('should be cancelable', (done) => {
    let number = '0',
        timerId = delay(() => {
          number = '1';
        }, 32);

    clearTimeout(timerId);

    setTimeout(() => {
      expect(number).toBe('0');
      done();
    }, 64);
  });
});
