function countdown(props) {
  const {
    callback = () => {},
    defaultCount = 60,
  } = props;
  let nowCount = defaultCount;
  let timer = null;

  const clear = () => {
    clearTimeout(timer);
    timer = null;
  };

  function down() {
    clear();
    // 当相等时，会立即执行一次
    if (nowCount === defaultCount) {
      nowCount --;
      callback(nowCount, defaultCount);
      down();
    } else if (nowCount <= defaultCount) {
      timer = setTimeout(() => {
        nowCount--;
        nowCount > 0 ? down() : clear();
        callback(nowCount, defaultCount);
      }, 1000)
    }
  }
  down();
}

export default countdown;
