import { useState, useEffect } from 'react';

export const useNumber = (initialValue  = 0, step = 1) => {
  const [value, setValue] = useState(initialValue);
  const increase = () => setValue(value => value + step);
  const decrease = () => setValue(value => value - step);
  return { value, increase, decrease };
};

export const useBoolean = (initialState = false) => {
  const [value, setValue] = useState(initialState);
  const inverse = () => setValue(!value);
  return { value, inverse };
};

export const useDocumentTitle = (title = '') => {
  useEffect(() => {
    window.document.title = title;
  }, [title]);
};

export const useInput = (initialValue = '', options = {}) => {

  const initial = options.persist
    ? window.localStorage.getItem(options.persist)
    : initialValue;

  const [value, setValue] = useState(initial);

  useEffect(() => {
    if (options.persist) {
      window.localStorage.setItem(options.persist, value);
    }
  }, [value, options.persist]);

  return {
    value,
    isValid: value && value.trim() !== '',
    bind: {
      onChange: e => setValue(e.target.value),
      value
    },
    clear: () => setValue(""),
    reset: () => setValue(initialValue)
  };
};


export const useMeasureWindow = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    const resizeHandler = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, []);

  return { width, height };
};

export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};
