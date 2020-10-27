'use strict';

const mapPinTemplate = document.querySelector('#pin');
const map = document.querySelector('.map');
const formFieldsets = document.querySelectorAll('.ad-form fieldset');
const mapFilters = document.querySelectorAll('.map__filters > *');
const form = document.querySelector('.ad-form');
const mainPin = document.querySelector('.map__pin--main');
map.classList.remove('map--faded');

const MAX_RENDERED_PINS = 5;

window.map = {
  renderMapPins: renderMapPins,
  setActiveState: setActiveState,
  setNonActiveState: setNonActiveState,
}

function createMapPin(offer) {
  let mapPin = mapPinTemplate.cloneNode(true).content;

  mapPin.querySelector('.map__pin').style = 'left: ' + (offer.location.x - window.pin.pinWidth / 2) + 'px; top: ' + (offer.location.y - window.pin.pinHeight) + 'px;';
  mapPin.querySelector('img').src = offer.author.avatar;
  mapPin.querySelector('img').alt = offer.offer.title;
  return mapPin;
}

function clearMapPins() {
  let pins = map.querySelectorAll('.map__pins button');
  pins.forEach(element => {if (!element.classList.contains('map__pin--main')) element.remove()});
}

function renderMapPins() {
  clearMapPins();
  let pinList = map.querySelector('.map__pins');
  let fragment = document.createDocumentFragment();

  let offers = window.filters.applyFilters(window.data.offers);
  const pinCount = (MAX_RENDERED_PINS < offers.length) ? 5 : offers.length;

  for (let i = 0; i < pinCount; i++) {
    fragment.appendChild(createMapPin(offers[i]));
  }
  pinList.appendChild(fragment);

  let pins = map.querySelectorAll('.map__pin');
  for (let i = 0; i < pinCount; i++) {
    pins[i + 1].addEventListener('click', () => window.card.renderPinCard(offers[i]));
  }
}

function successHandler(offers) {
  window.data = { offers: offers }
  renderMapPins();
};

function setActiveState() {
  formFieldsets.forEach(item => item.disabled = false);
  mapFilters.forEach(item => item.disabled = false);
  form.classList.remove('ad-form--disabled');
  map.classList.remove('map--faded');
  window.backend.load(successHandler);
  mainPin.removeEventListener('mousedown', window.pin.onMainPinMousePress);
  mainPin.removeEventListener('keydown', window.pin.onMainPinEnterPress);
}

function setNonActiveState() {
  formFieldsets.forEach(item => item.disabled = true);
  mapFilters.forEach(item => item.disabled = true);
  form.classList.add('ad-form--disabled');
  map.classList.add('map--faded');
  mainPin.addEventListener('mousedown', window.pin.onMainPinMousePress);
  mainPin.addEventListener('keydown', window.pin.onMainPinMousePress);
}
