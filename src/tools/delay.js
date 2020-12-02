function delay(func, wait, ...args) {
  if (typeof func !== 'function') {
    throw new TypeError('Warning: [delay] Expected a function');
  }

  return setTimeout(func, +wait || 0, ...args);
}

export default delay;
