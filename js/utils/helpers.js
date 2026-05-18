/* =========================================
   ARNOREX HELPER UTILITIES
   Shared Marketplace Functions
========================================= */

import {
  APP
} from '../core/constants.js';

/* =========================================
   SAFE QUERY SELECTOR
========================================= */

export const $ = (
  selector,
  parent = document
) => {

  return parent.querySelector(
    selector
  );

};

export const $$ = (
  selector,
  parent = document
) => {

  return [
    ...parent.querySelectorAll(
      selector
    )
  ];

};

/* =========================================
   CREATE ELEMENT
========================================= */

export const createElement = (
  tag,
  className = '',
  content = ''
) => {

  const element =
    document.createElement(tag);

  if (className) {
    element.className = className;
  }

  if (content) {
    element.innerHTML = content;
  }

  return element;
};

/* =========================================
   FORMAT PRICE
========================================= */

export const formatPrice = (
  amount = 0,
  currency = APP.CURRENCY
) => {

  return new Intl.NumberFormat(
    'en-US',
    {
      style: 'currency',
      currency
    }
  ).format(amount);

};

/* =========================================
   FORMAT NUMBER
========================================= */

export const formatNumber = (
  value = 0
) => {

  return new Intl.NumberFormat(
    'en-US'
  ).format(value);

};

/* =========================================
   FORMAT DATE
========================================= */

export const formatDate = (
  date
) => {

  if (!date) {
    return '';
  }

  return new Intl.DateTimeFormat(
    'en-US',
    {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }
  ).format(
    new Date(date)
  );

};

/* =========================================
   TRUNCATE TEXT
========================================= */

export const truncateText = (
  text = '',
  maxLength = 80
) => {

  if (
    text.length <= maxLength
  ) {
    return text;
  }

  return (
    text.slice(
      0,
      maxLength
    ) + '...'
  );

};

/* =========================================
   GENERATE RANDOM ID
========================================= */

export const generateId = (
  prefix = 'arn'
) => {

  return (
    prefix +
    '_' +
    Math.random()
      .toString(36)
      .substring(2, 10)
  );

};

/* =========================================
   DELAY
========================================= */

export const delay = (
  duration = 300
) => {

  return new Promise(
    resolve => {

      setTimeout(
        resolve,
        duration
      );

    }
  );

};

/* =========================================
   DEBOUNCE
========================================= */

export const debounce = (
  callback,
  delayTime = 300
) => {

  let timeout;

  return (...args) => {

    clearTimeout(timeout);

    timeout = setTimeout(
      () => {

        callback(...args);

      },
      delayTime
    );

  };

};

/* =========================================
   THROTTLE
========================================= */

export const throttle = (
  callback,
  limit = 200
) => {

  let waiting = false;

  return (...args) => {

    if (waiting) {
      return;
    }

    callback(...args);

    waiting = true;

    setTimeout(
      () => {

        waiting = false;

      },
      limit
    );

  };

};

/* =========================================
   SCROLL TO TOP
========================================= */

export const scrollToTop = (
  smooth = true
) => {

  window.scrollTo({
    top: 0,

    behavior:
      smooth
        ? 'smooth'
        : 'auto'
  });

};

/* =========================================
   COPY TO CLIPBOARD
========================================= */

export const copyToClipboard = async (
  text
) => {

  try {

    await navigator.clipboard.writeText(
      text
    );

    return true;

  } catch (error) {

    console.error(
      'Clipboard error:',
      error
    );

    return false;
  }

};

/* =========================================
   GET URL PARAM
========================================= */

export const getUrlParam = (
  key
) => {

  const params =
    new URLSearchParams(
      window.location.search
    );

  return params.get(key);

};

/* =========================================
   UPDATE URL PARAM
========================================= */

export const updateUrlParam = (
  key,
  value
) => {

  const url =
    new URL(window.location);

  url.searchParams.set(
    key,
    value
  );

  window.history.replaceState(
    {},
    '',
    url
  );

};

/* =========================================
   REMOVE URL PARAM
========================================= */

export const removeUrlParam = (
  key
) => {

  const url =
    new URL(window.location);

  url.searchParams.delete(key);

  window.history.replaceState(
    {},
    '',
    url
  );

};

/* =========================================
   RANDOM INTEGER
========================================= */

export const randomInt = (
  min = 0,
  max = 100
) => {

  return Math.floor(
    Math.random() *
    (max - min + 1)
  ) + min;

};

/* =========================================
   RANDOM ARRAY ITEM
========================================= */

export const randomItem = (
  array = []
) => {

  if (!array.length) {
    return null;
  }

  return array[
    Math.floor(
      Math.random() *
      array.length
    )
  ];

};

/* =========================================
   CLAMP VALUE
========================================= */

export const clamp = (
  value,
  min,
  max
) => {

  return Math.min(
    Math.max(value, min),
    max
  );

};

/* =========================================
   IS MOBILE
========================================= */

export const isMobile = () => {

  return window.innerWidth <= 768;

};

/* =========================================
   IMAGE PRELOAD
========================================= */

export const preloadImage = (
  src
) => {

  return new Promise(
    (resolve, reject) => {

      const image =
        new Image();

      image.src = src;

      image.onload =
        () => resolve(image);

      image.onerror =
        reject;

    }
  );

};

/* =========================================
   STORAGE HELPERS
========================================= */

export const storage = {

  set(key, value) {

    localStorage.setItem(
      key,
      JSON.stringify(value)
    );

  },

  get(key, fallback = null) {

    try {

      const item =
        localStorage.getItem(key);

      return item
        ? JSON.parse(item)
        : fallback;

    } catch {

      return fallback;
    }

  },

  remove(key) {

    localStorage.removeItem(
      key
    );

  },

  clear() {

    localStorage.clear();

  }

};

/* =========================================
   ARRAY UNIQUE
========================================= */

export const uniqueArray = (
  array = []
) => {

  return [
    ...new Set(array)
  ];

};

/* =========================================
   SORT BY
========================================= */

export const sortBy = (
  array = [],
  key = ''
) => {

  return [...array].sort(
    (a, b) => {

      if (a[key] < b[key]) {
        return -1;
      }

      if (a[key] > b[key]) {
        return 1;
      }

      return 0;

    }
  );

};

/* =========================================
   SAFE JSON PARSE
========================================= */

export const safeJsonParse = (
  value,
  fallback = null
) => {

  try {

    return JSON.parse(value);

  } catch {

    return fallback;
  }

};

/* =========================================
   CAPITALIZE
========================================= */

export const capitalize = (
  text = ''
) => {

  if (!text.length) {
    return '';
  }

  return (
    text.charAt(0)
      .toUpperCase() +
    text.slice(1)
  );

};

/* =========================================
   FILE SIZE FORMATTER
========================================= */

export const formatFileSize = (
  bytes = 0
) => {

  if (bytes === 0) {
    return '0 Bytes';
  }

  const sizes = [
    'Bytes',
    'KB',
    'MB',
    'GB'
  ];

  const index =
    Math.floor(
      Math.log(bytes) /
      Math.log(1024)
    );

  return (
    (
      bytes /
      Math.pow(1024, index)
    ).toFixed(2) +
    ' ' +
    sizes[index]
  );

};

/* =========================================
   EXPORT DEFAULT
========================================= */

export default {
  $,
  $$,
  createElement,

  formatPrice,
  formatNumber,
  formatDate,
  truncateText,

  generateId,

  delay,
  debounce,
  throttle,

  scrollToTop,

  copyToClipboard,

  getUrlParam,
  updateUrlParam,
  removeUrlParam,

  randomInt,
  randomItem,

  clamp,

  isMobile,

  preloadImage,

  storage,

  uniqueArray,
  sortBy,

  safeJsonParse,

  capitalize,

  formatFileSize
};