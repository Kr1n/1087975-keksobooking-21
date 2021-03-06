'use strict';

const DEFAULT_PIN_X = 570;
const DEFAULT_PIN_Y = 375;

const reset = () => {
  window.form.reset();
  window.pin.closeCard();
  window.map.clearPins();
  window.map.setNonActiveState();
  window.mainPin.moveMainPin(DEFAULT_PIN_X, DEFAULT_PIN_Y);
};

window.page = {
  reset,
};
