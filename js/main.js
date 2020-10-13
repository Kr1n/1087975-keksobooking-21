"use strict";

(function() {

  const mainPin = document.querySelector(".map__pin--main");
  const mainPinWidth = 62;
  const mainPinHeight = 84;

  window.map.setNonActiveState();
  window.form.setAddressValue(mainPin.offsetLeft + mainPinWidth / 2, mainPin.offsetTop + mainPinHeight);

})();
