function countdown(props) {
  const {
    callback = () => {},
    defaultCount = 59,
  } = props;
  let nowCount = defaultCount;
  let timer = null;

  function down() {
    clearTimeout(timer);
    timer = null;
    if (nowCount <= defaultCount) {
      timer = setTimeout(() => {
        nowCount--;
        if (nowCount > 0) {
          down();
        }
        callback(nowCount, defaultCount);
      }, 1000)
    }
  }
  down();
}

export default countdown;
