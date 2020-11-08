'use strict';

const resetPage = () => {
  const DEFAULT_PIN_X = 570;
  const DEFAULT_PIN_Y = 375;
  window.form.reset();
  window.map.clearPins();
  window.map.setNonActiveState();
  window.mainPin.moveMainPin(DEFAULT_PIN_X, DEFAULT_PIN_Y);
};

window.page = {
  resetPage,
};
