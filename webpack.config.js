const path = require('path');

module.exports = {
  entry: [
    './js/util.js',
    './js/data.js',
    './js/backend.js',
    './js/filters.js',
    './js/card.js',
    './js/pin.js',
    './js/map.js',
    './js/form.js',
    './js/mainPin.js',
    './js/main.js',
    ],
  output: {
    path: path.resolve(__dirname),
    filename: 'bundle.js',
    iife: true,
  },
  devtool: false,
};
