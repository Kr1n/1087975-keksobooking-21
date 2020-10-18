"use strict";

(function() {

  const mainPin = document.querySelector(".map__pin--main");

  window.map.setNonActiveState();
  window.form.setAddressValue(mainPin.offsetLeft + document.mainPin.mainPinWidth / 2, mainPin.offsetTop + document.mainPin.mainPinHeight);

})();
