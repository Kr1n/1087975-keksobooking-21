"use strict";

(function() {

  const mainPin = document.querySelector(".map__pin--main");
  const map = document.querySelector(".map");
  const formFieldsets = document.querySelectorAll(".ad-form fieldset");
  const mapFilters = document.querySelectorAll(".map__filters > *");
  const form = document.querySelector(".ad-form");

  const pinWidth = 50;
  const pinHeight = 70;

  window.pin = {
    onPinCardEscPress: onPinCardEscPress,
    onMainPinEnterPress: onMainPinEnterPress,
    onMainPinMousePress: onMainPinMousePress,
    setActiveState: setActiveState,
    setNonActiveState: setNonActiveState,
    closePinCard: closePinCard,
    pinWidth: pinWidth,
    pinHeight: pinHeight,
  }

  function setActiveState() {
    formFieldsets.forEach(item => item.disabled = false);
    mapFilters.forEach(item => item.disabled = false);
    form.classList.remove("ad-form--disabled");
    map.classList.remove("map--faded");
    window.map.renderMapPins(window.data.offers);
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

  function closePinCard() {
    map.querySelector(".popup").classList.add("hidden");
    document.removeEventListener("keydown", onPinCardEscPress);
  }

  function onPinCardEscPress(evt) {
    if (evt.key === "Escape") {
      evt.preventDefault();
      closePinCard();
    }
  }

  function onMainPinEnterPress(evt) {
    if (evt.key === "Enter") {
      setActiveState();
    }
  }

  function onMainPinMousePress(evt) {
    if (typeof evt === "object" && evt.button === 0) {
      setActiveState();
    }
  }

})();
