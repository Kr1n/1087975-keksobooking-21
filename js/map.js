"use strict";

(function() {

  const mapPinTemplate = document.querySelector("#pin");
  const map = document.querySelector(".map");
  const formFieldsets = document.querySelectorAll(".ad-form fieldset");
  const mapFilters = document.querySelectorAll(".map__filters > *");
  const form = document.querySelector(".ad-form");
  const mainPin = document.querySelector(".map__pin--main");
  map.classList.remove("map--faded");

  window.map = {
    renderMapPins: renderMapPins,
    setActiveState: setActiveState,
    setNonActiveState: setNonActiveState,
  }

  function createMapPin(offer) {
    let mapPin = mapPinTemplate.cloneNode(true).content;

    mapPin.querySelector(".map__pin").style = "left: " + (offer.location.x - window.pin.pinWidth / 2) + "px; top: " + (offer.location.y - window.pin.pinHeight) + "px;";
    mapPin.querySelector("img").src = offer.author.avatar;
    mapPin.querySelector("img").alt = offer.offer.title;
    return mapPin;
  }

  function renderMapPins(offers) {
    let pinList = map.querySelector(".map__pins");
    let fragment = document.createDocumentFragment();

    for (let i = 0; i < offers.length; i++) {
      fragment.appendChild(createMapPin(offers[i]));
    }

    pinList.appendChild(fragment);
    pinList = map.querySelectorAll(".map__pin");

    for (let i = 1; i < pinList.length; i++) {
      pinList[i].addEventListener("click", () => window.card.renderPinCard(window.data.offers[i - 1]));
    }
  }

  function setActiveState() {
    formFieldsets.forEach(item => item.disabled = false);
    mapFilters.forEach(item => item.disabled = false);
    form.classList.remove("ad-form--disabled");
    map.classList.remove("map--faded");
    window.map.renderMapPins(window.data.offers);
    mainPin.removeEventListener("mousedown", window.pin.onMainPinMousePress);
    mainPin.removeEventListener("keydown", window.pin.onMainPinEnterPress);
  }

  function setNonActiveState() {
    formFieldsets.forEach(item => item.disabled = true);
    mapFilters.forEach(item => item.disabled = true);
    form.classList.add("ad-form--disabled");
    map.classList.add("map--faded");
    mainPin.addEventListener("mousedown", window.pin.onMainPinMousePress);
    mainPin.addEventListener("keydown", window.pin.onMainPinMousePress);
  }

})();
