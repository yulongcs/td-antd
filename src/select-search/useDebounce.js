import { useEffect, useCallback, useRef } from 'react';

function useDebounce(fn, delay = 600, dep = []) {
  const { current } = useRef({ fn, timer: null });

  useEffect(() => {
    current.fn = fn;
  }, [fn]);

  return useCallback(function f(...args) {
    if (current.timer) {
      clearTimeout(current.timer);
    }
    current.timer = setTimeout(() => {
      current.fn.call(this, ...args);
    }, delay);
  }, dep)
}

export default useDebounce;
