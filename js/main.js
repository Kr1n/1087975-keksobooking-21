"use strict";

(function() {

  let mainPin = document.querySelector(".map__pin--main");
  let form = document.querySelector(".ad-form");
  let formFieldsets = document.querySelectorAll(".ad-form fieldset");
  let mapFilters = document.querySelectorAll(".map__filters > *");
  let map = document.querySelector(".map");

  const mainPinWidth = 62;
  const mainPinHeight = 84;

  window.data.createOffersArray(8);
  window.pin.setNonActiveState();
  window.form.setAddressValue(mainPin.offsetLeft + mainPinWidth / 2, mainPin.offsetTop + mainPinHeight);

})();
