function countdown(props) {
  const {
    callback = () => {},
    defaultCount = 60,
  } = props;
  let nowCount = defaultCount;
  let timer = setInterval(() => {
    nowCount --;
    callback(nowCount, defaultCount);

    if (nowCount <= 0) {
      nowCount = defaultCount;
      clearInterval(timer);
      timer = null;
    }
  }, 1000);

  return timer;
}

countdown.clear = (timer) => {
  clearInterval(timer);
  timer = null;
};
export default countdown;
