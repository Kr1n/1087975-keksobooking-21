'use strict';

(function() {

  window.util = {
    getRandomInt: (min, max) => Math.floor(min + Math.random() * Math.floor(max - min)),
    removeAllChildNodes: parent => {while (parent.firstChild) { parent.removeChild(parent.firstChild); }},
  }
})();
