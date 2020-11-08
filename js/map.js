'use strict';

const mapPinTemplate = document.querySelector(`#pin`);
const map = document.querySelector(`.map`);
const formFieldsets = document.querySelectorAll(`.ad-form fieldset`);
const mapFilters = document.querySelectorAll(`.map__filters > *`);
const form = document.querySelector(`.ad-form`);
const mainPin = document.querySelector(`.map__pin--main`);
const MAX_RENDERED_PINS = 5;

map.classList.remove(`map--faded`);

window.map = {
  renderPins,
  setActiveState,
  setNonActiveState,
  clearPins,
};

let createMapPin = (offer) => {
  let mapPin = mapPinTemplate.cloneNode(true).content;

  mapPin.querySelector(`.map__pin`).style = `left: ` + (offer.location.x - window.pin.width / 2) + `px; top: ` + (offer.location.y - window.pin.height) + `px;`;
  mapPin.querySelector(`img`).src = offer.author.avatar;
  mapPin.querySelector(`img`).alt = offer.offer.title;
  return mapPin;
};

function clearPins() {
  let pins = map.querySelectorAll(`.map__pins button`);
  pins.forEach((element) => {
    if (!element.classList.contains(`map__pin--main`)) {
      element.remove();
    }
  });
};

function renderPins() {
  clearPins();
  let pinList = map.querySelector(`.map__pins`);
  let fragment = document.createDocumentFragment();

  let offers = window.filters.apply(window.data.offers);
  const pinCount = (MAX_RENDERED_PINS < offers.length) ? MAX_RENDERED_PINS : offers.length;

  for (let i = 0; i < pinCount; i++) {
    fragment.appendChild(createMapPin(offers[i]));
  }
  pinList.appendChild(fragment);

  let pins = map.querySelectorAll(`.map__pin`);
  for (let i = 0; i < pinCount; i++) {
    pins[i + 1].addEventListener(`click`, () => window.card.render(offers[i]));
  }
}

let successHandler = (offers) => {
  window.data = {
    offers: offers
  };

  if (window.data.offers.length) {
    mapFilters.forEach((item) => (item.disabled = false));
  }
  renderPins();
};

let errorHandler = (offers) => {
  window.data = {
    offers: offers
  };
  renderPins();
};

function setActiveState() {
  formFieldsets.forEach((item) => (item.disabled = false));
  form.classList.remove(`ad-form--disabled`);
  map.classList.remove(`map--faded`);
  window.backend.load(successHandler);
  mainPin.removeEventListener(`mousedown`, window.pin.onMainMousePress);
  mainPin.removeEventListener(`keydown`, window.pin.onMainEnterPress);
}

function setNonActiveState() {
  formFieldsets.forEach((item) => (item.disabled = true));
  mapFilters.forEach((item) => (item.disabled = true));
  form.classList.add(`ad-form--disabled`);
  map.classList.add(`map--faded`);
  mainPin.addEventListener(`mousedown`, window.pin.onMainMousePress);
  mainPin.addEventListener(`keydown`, window.pin.onMainEnterPress);
}
