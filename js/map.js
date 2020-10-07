"use strict";

(function() {

  const mapPinTemplate = document.querySelector("#pin");
  const map = document.querySelector(".map");
  map.classList.remove("map--faded");

  window.map = {
    renderMapPins: renderMapPins,
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
      pinList[i].addEventListener("click", () => window.pin.renderPinCard(window.data.offers[i - 1]));
    }
  }

})();
