"use strict";

(function() {

  const DEBOUNCE_INTERVAL = 500; // ms

  let debounce = function (cb) {
    let lastTimeout = null;

    return function(...parameters) {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function() {
        cb(...parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  window.util = {
    getRandomInt: (min, max) => Math.floor(min + Math.random() * Math.floor(max - min)),
    removeAllChildNodes: parent => {while (parent.firstChild) { parent.removeChild(parent.firstChild); }},
    debounce: debounce,
  }


})();
