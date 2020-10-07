"use strict";

(function() {

  const mainPin = document.querySelector(".map__pin--main");
  const pinCardTemplate = document.querySelector("#card");
  const formFieldsets = document.querySelectorAll(".ad-form fieldset");
  const mapFilters = document.querySelectorAll(".map__filters > *");
  const map = document.querySelector(".map");
  const form = document.querySelector(".ad-form");

  const pinWidth = 50;
  const pinHeight = 70;

  window.pin = {
    onPinCardEscPress: onPinCardEscPress,
    onMainPinEnterPress: onMainPinEnterPress,
    onMainPinMousePress: onMainPinMousePress,
    createPinCard: createPinCard,
    renderPinCard: renderPinCard,
    setActiveState: setActiveState,
    setNonActiveState: setNonActiveState,
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

  function createPinCard(offer) {
    let pinCard = pinCardTemplate.cloneNode(true).content;

    let type;
    switch (offer.offer.type) {
      case "flat": type = "Квартира"; break;
      case "bungalow": type = "Бунгало"; break;
      case "house": type = "Дом"; break;
      case "palace": type = "Дворец"; break;
      default: type = "Квартира"; break;
    }

    let photosList = document.createDocumentFragment();
    let photoItem;
    for (let i = 0; i < offer.offer.photos.length; i++) {
      photoItem = pinCard.querySelector(".popup__photos img").cloneNode(true);
      photoItem.src = offer.offer.photos[i];
      photosList.appendChild(photoItem);
    }

    let featuresList = document.createDocumentFragment();
    let featuresItem;
    for (let i = 0; i < offer.offer.features.length; i++) {
      featuresItem = document.createElement("li");
      featuresItem.classList.add("popup__feature");
      featuresItem.classList.add("popup__feature--" + offer.offer.features[i]);
      featuresList.appendChild(featuresItem);
    }

    pinCard.querySelector(".popup__title").textContent = offer.offer.title;
    pinCard.querySelector(".popup__text--address").textContent = offer.offer.address;
    pinCard.querySelector(".popup__text--price").textContent = offer.offer.price + "₽/ночь";
    pinCard.querySelector(".popup__type").textContent = type;
    pinCard.querySelector(".popup__text--capacity").textContent = offer.offer.rooms + " комнаты для " + offer.offer.guests + " гостей";
    pinCard.querySelector(".popup__text--time").textContent = "Заезд после " + offer.offer.checkin + ", выезд до " + offer.offer.checkout;
    pinCard.querySelector(".popup__description").textContent = offer.offer.description;
    pinCard.querySelector("img").src = offer.author.avatar;

    let photos = pinCard.querySelector(".popup__photos");
    window.util.removeAllChildNodes(photos);
    photos.appendChild(photosList);

    let features = pinCard.querySelector(".popup__features");
    window.util.removeAllChildNodes(features);
    features.appendChild(featuresList);

    return pinCard;
  }

  function renderPinCard(offer) {
    let pinCards = map.querySelectorAll(".map__card");
    let element = document.createElement("div");

    pinCards.forEach(item => item.remove());
    element.appendChild(createPinCard(offer));

    map.querySelector(".map__filters-container").insertAdjacentHTML("beforebegin", element.innerHTML);

    map.querySelector(".popup__close").addEventListener("click", function (evt) {
      closePinCard(evt.target);
    });
    map.querySelector(".popup__close").addEventListener("keydown", function (evt) {
      if (evt.key === "Enter") {
        closePinCard();
      }
    });
    document.addEventListener("keydown", onPinCardEscPress);
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
