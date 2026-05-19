/* =========================================
   ARNOREX HELPERS
========================================= */

/* =========================================
   DEBOUNCE
========================================= */

export const debounce = (
  callback,
  delay = 300
) => {

  let timeout;

  return (...args) => {

    clearTimeout(timeout);

    timeout = setTimeout(() => {

      callback(...args);

    }, delay);

  };

};

/* =========================================
   GENERATE ID
========================================= */

export const generateId = () => {

  return (
    Date.now().toString(36)
    +
    Math.random()
      .toString(36)
      .substring(2, 8)
  );

};

/* =========================================
   SCROLL TO TOP
========================================= */

export const scrollToTop = () => {

  window.scrollTo({

    top: 0,

    behavior: 'smooth'

  });

};

/* =========================================
   SLEEP
========================================= */

export const sleep = (
  ms = 1000
) => {

  return new Promise(resolve => {

    setTimeout(
      resolve,
      ms
    );

  });

};

/* =========================================
   EXPORT DEFAULT
========================================= */

export default {

  debounce,

  generateId,

  scrollToTop,

  sleep

};