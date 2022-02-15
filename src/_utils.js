export const _setTimeout = (callback = () => {}, time = 0) => {
  const timer = window.setTimeout(() => {
    callback();
    window.clearTimeout(timer);
  }, time)
};
