/* =========================================
   ARNOREX DOM UTILITIES
   Marketplace Rendering Engine
========================================= */

import {
  $,
  $$,
  createElement
} from './helpers.js';

/* =========================================
   SET TEXT
========================================= */

export const setText = (
  selector,
  value = ''
) => {

  const element =
    typeof selector === 'string'
      ? $(selector)
      : selector;

  if (!element) {
    return;
  }

  element.textContent = value;

};

/* =========================================
   SET HTML
========================================= */

export const setHTML = (
  selector,
  value = ''
) => {

  const element =
    typeof selector === 'string'
      ? $(selector)
      : selector;

  if (!element) {
    return;
  }

  element.innerHTML = value;

};

/* =========================================
   SHOW ELEMENT
========================================= */

export const showElement = (
  selector,
  display = 'block'
) => {

  const element =
    typeof selector === 'string'
      ? $(selector)
      : selector;

  if (!element) {
    return;
  }

  element.style.display = display;

};

/* =========================================
   HIDE ELEMENT
========================================= */

export const hideElement = (
  selector
) => {

  const element =
    typeof selector === 'string'
      ? $(selector)
      : selector;

  if (!element) {
    return;
  }

  element.style.display = 'none';

};

/* =========================================
   TOGGLE ELEMENT
========================================= */

export const toggleElement = (
  selector,
  display = 'block'
) => {

  const element =
    typeof selector === 'string'
      ? $(selector)
      : selector;

  if (!element) {
    return;
  }

  const isHidden =
    getComputedStyle(element)
      .display === 'none';

  element.style.display =
    isHidden
      ? display
      : 'none';

};

/* =========================================
   ADD CLASS
========================================= */

export const addClass = (
  selector,
  className
) => {

  const element =
    typeof selector === 'string'
      ? $(selector)
      : selector;

  if (!element) {
    return;
  }

  element.classList.add(className);

};

/* =========================================
   REMOVE CLASS
========================================= */

export const removeClass = (
  selector,
  className
) => {

  const element =
    typeof selector === 'string'
      ? $(selector)
      : selector;

  if (!element) {
    return;
  }

  element.classList.remove(className);

};

/* =========================================
   TOGGLE CLASS
========================================= */

export const toggleClass = (
  selector,
  className
) => {

  const element =
    typeof selector === 'string'
      ? $(selector)
      : selector;

  if (!element) {
    return;
  }

  element.classList.toggle(className);

};

/* =========================================
   HAS CLASS
========================================= */

export const hasClass = (
  selector,
  className
) => {

  const element =
    typeof selector === 'string'
      ? $(selector)
      : selector;

  if (!element) {
    return false;
  }

  return element.classList.contains(
    className
  );

};

/* =========================================
   SET ATTRIBUTE
========================================= */

export const setAttribute = (
  selector,
  attribute,
  value
) => {

  const element =
    typeof selector === 'string'
      ? $(selector)
      : selector;

  if (!element) {
    return;
  }

  element.setAttribute(
    attribute,
    value
  );

};

/* =========================================
   REMOVE ATTRIBUTE
========================================= */

export const removeAttribute = (
  selector,
  attribute
) => {

  const element =
    typeof selector === 'string'
      ? $(selector)
      : selector;

  if (!element) {
    return;
  }

  element.removeAttribute(
    attribute
  );

};

/* =========================================
   APPEND CHILD
========================================= */

export const appendChild = (
  parent,
  child
) => {

  const parentElement =
    typeof parent === 'string'
      ? $(parent)
      : parent;

  if (!parentElement || !child) {
    return;
  }

  parentElement.appendChild(child);

};

/* =========================================
   REMOVE ELEMENT
========================================= */

export const removeElement = (
  selector
) => {

  const element =
    typeof selector === 'string'
      ? $(selector)
      : selector;

  if (!element) {
    return;
  }

  element.remove();

};

/* =========================================
   EMPTY ELEMENT
========================================= */

export const emptyElement = (
  selector
) => {

  const element =
    typeof selector === 'string'
      ? $(selector)
      : selector;

  if (!element) {
    return;
  }

  element.innerHTML = '';

};

/* =========================================
   CREATE BUTTON
========================================= */

export const createButton = ({
  text = '',
  className = '',
  type = 'button'
}) => {

  const button =
    createElement(
      'button',
      className,
      text
    );

  button.type = type;

  return button;

};

/* =========================================
   CREATE IMAGE
========================================= */

export const createImage = ({
  src = '',
  alt = '',
  className = ''
}) => {

  const image =
    createElement(
      'img',
      className
    );

  image.src = src;

  image.alt = alt;

  return image;

};

/* =========================================
   EVENT LISTENER
========================================= */

export const on = (
  selector,
  event,
  callback
) => {

  const elements =
    typeof selector === 'string'
      ? $$(selector)
      : [selector];

  elements.forEach(element => {

    if (!element) {
      return;
    }

    element.addEventListener(
      event,
      callback
    );

  });

};

/* =========================================
   REMOVE EVENT LISTENER
========================================= */

export const off = (
  selector,
  event,
  callback
) => {

  const elements =
    typeof selector === 'string'
      ? $$(selector)
      : [selector];

  elements.forEach(element => {

    if (!element) {
      return;
    }

    element.removeEventListener(
      event,
      callback
    );

  });

};

/* =========================================
   EVENT DELEGATION
========================================= */

export const delegate = (
  parentSelector,
  childSelector,
  event,
  callback
) => {

  const parent =
    typeof parentSelector === 'string'
      ? $(parentSelector)
      : parentSelector;

  if (!parent) {
    return;
  }

  parent.addEventListener(
    event,
    (e) => {

      const target =
        e.target.closest(
          childSelector
        );

      if (!target) {
        return;
      }

      callback(e, target);

    }
  );

};

/* =========================================
   RENDER LIST
========================================= */

export const renderList = ({
  container,
  items = [],
  renderItem
}) => {

  const element =
    typeof container === 'string'
      ? $(container)
      : container;

  if (!element || !renderItem) {
    return;
  }

  element.innerHTML = items
    .map(renderItem)
    .join('');

};

/* =========================================
   FADE IN
========================================= */

export const fadeIn = (
  selector,
  duration = 300
) => {

  const element =
    typeof selector === 'string'
      ? $(selector)
      : selector;

  if (!element) {
    return;
  }

  element.style.opacity = 0;

  element.style.display = 'block';

  element.style.transition =
    `opacity ${duration}ms ease`;

  requestAnimationFrame(() => {

    element.style.opacity = 1;

  });

};

/* =========================================
   FADE OUT
========================================= */

export const fadeOut = (
  selector,
  duration = 300
) => {

  const element =
    typeof selector === 'string'
      ? $(selector)
      : selector;

  if (!element) {
    return;
  }

  element.style.transition =
    `opacity ${duration}ms ease`;

  element.style.opacity = 0;

  setTimeout(() => {

    element.style.display = 'none';

  }, duration);

};

/* =========================================
   SCROLL INTO VIEW
========================================= */

export const scrollIntoView = (
  selector,
  options = {
    behavior: 'smooth',
    block: 'start'
  }
) => {

  const element =
    typeof selector === 'string'
      ? $(selector)
      : selector;

  if (!element) {
    return;
  }

  element.scrollIntoView(
    options
  );

};

/* =========================================
   LOCK BODY SCROLL
========================================= */

export const lockScroll = () => {

  document.body.style.overflow =
    'hidden';

};

/* =========================================
   UNLOCK BODY SCROLL
========================================= */

export const unlockScroll = () => {

  document.body.style.overflow =
    '';

};

/* =========================================
   EXPORT DEFAULT
========================================= */

export default {
  setText,
  setHTML,

  showElement,
  hideElement,
  toggleElement,

  addClass,
  removeClass,
  toggleClass,
  hasClass,

  setAttribute,
  removeAttribute,

  appendChild,
  removeElement,
  emptyElement,

  createButton,
  createImage,

  on,
  off,
  delegate,

  renderList,

  fadeIn,
  fadeOut,

  scrollIntoView,

  lockScroll,
  unlockScroll
};