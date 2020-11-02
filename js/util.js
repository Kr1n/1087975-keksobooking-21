'use strict';

const DEBOUNCE_INTERVAL = 500; // ms

let debounce = (cb) => {
  let lastTimeout = null;

  return (...parameters) => {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(() => cb(...parameters), DEBOUNCE_INTERVAL);
  };
};

window.util = {
  getRandomInt: (min, max) => Math.floor(min + Math.random() * Math.floor(max - min)),
  removeAllChildNodes: (parent) => {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  },
  debounce: debounce,
};
