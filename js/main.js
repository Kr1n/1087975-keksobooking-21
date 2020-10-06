"use strict";

(function() {

  const offerArray = window.data.createOffersArray(8);

  let mainPin = document.querySelector(".map__pin--main");
  let form = document.querySelector(".ad-form");
  let formFieldsets = document.querySelectorAll(".ad-form fieldset");
  let mapFilters = document.querySelectorAll(".map__filters > *");
  let map = document.querySelector(".map");

  function setActiveState() {
    formFieldsets.forEach(item => item.disabled = false);
    mapFilters.forEach(item => item.disabled = false);
    form.classList.remove("ad-form--disabled");
    map.classList.remove("map--faded");
    renderMapPins(offerArray);
    mainPin.removeEventListener("mousedown", onMainPinMousePress);
    mainPin.removeEventListener("keydown", onMainPinEnterPress);
  }

  function setNonActiveState() {
    formFieldsets.forEach(item => item.disabled = true);
    mapFilters.forEach(item => item.disabled = true);
    form.classList.add("ad-form--disabled");
    map.classList.add("map--faded");
    mainPin.addEventListener("mousedown", window.pin.onMainPinMousePress);
    mainPin.addEventListener("keydown", window.pin.onMainPinMousePress);
  }

  const mainPinWidth = 62;
  const mainPinHeight = 84;

  setNonActiveState();
  window.form.setAddressValue(mainPin.offsetLeft + mainPinWidth / 2, mainPin.offsetTop + mainPinHeight);

})();
