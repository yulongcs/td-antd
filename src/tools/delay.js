function delay(func, wait, ...args) {
  return setTimeout(func, +wait || 0, ...args);
}

export default delay;
