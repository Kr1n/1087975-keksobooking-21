'use strict';

window.card = {
  createPinCard: createPinCard,
  renderPinCard: renderPinCard,
};

const map = document.querySelector(`.map`);
const pinCardTemplate = document.querySelector(`#card`);

const types = {
  flat: `Квартира`,
  bungalow: `Бунгало`,
  house: `Дом`,
  palace: `Дворец`,
};

function createPinCard(offer) {
  let pinCard = pinCardTemplate.cloneNode(true).content;

  let type = types[offer.offer.type];

  let photosList = document.createDocumentFragment();
  let photoItem;
  for (let i = 0; i < offer.offer.photos.length; i++) {
    photoItem = pinCard.querySelector(`.popup__photos img`).cloneNode(true);
    photoItem.src = offer.offer.photos[i];
    photosList.appendChild(photoItem);
  }

  let featuresList = document.createDocumentFragment();
  let featuresItem;
  for (let i = 0; i < offer.offer.features.length; i++) {
    featuresItem = document.createElement(`li`);
    featuresItem.classList.add(`popup__feature`);
    featuresItem.classList.add(`popup__feature--` + offer.offer.features[i]);
    featuresList.appendChild(featuresItem);
  }

  pinCard.querySelector(`.popup__title`).textContent = offer.offer.title;
  pinCard.querySelector(`.popup__text--address`).textContent = offer.offer.address;
  pinCard.querySelector(`.popup__text--price`).textContent = offer.offer.price + `₽/ночь`;
  pinCard.querySelector(`.popup__type`).textContent = type;
  pinCard.querySelector(`.popup__text--capacity`).textContent = offer.offer.rooms + ` комнаты для ` + offer.offer.guests + ` гостей`;
  pinCard.querySelector(`.popup__text--time`).textContent = `Заезд после ` + offer.offer.checkin + `, выезд до ` + offer.offer.checkout;
  pinCard.querySelector(`.popup__description`).textContent = offer.offer.description;
  pinCard.querySelector(`img`).src = offer.author.avatar;

  let photos = pinCard.querySelector(`.popup__photos`);
  window.util.removeAllChildNodes(photos);
  photos.appendChild(photosList);

  let features = pinCard.querySelector(`.popup__features`);
  window.util.removeAllChildNodes(features);
  features.appendChild(featuresList);

  return pinCard;
}

function renderPinCard(offer) {
  let pinCards = map.querySelectorAll(`.map__card`);
  let element = document.createElement(`div`);

  pinCards.forEach((item) => item.remove());
  element.appendChild(createPinCard(offer));
  map.querySelector(`.map__filters-container`).insertAdjacentHTML(`beforebegin`, element.innerHTML);

  map.querySelector(`.popup__close`).addEventListener(`click`, (evt) => {
    window.pin.closePinCard(evt.target);
  });
  map.querySelector(`.popup__close`).addEventListener(`keydown`, (evt) => {
    if (evt.key === `Enter`) {
      window.pin.closePinCard();
    }
  });
  document.addEventListener(`keydown`, window.pin.onPinCardEscPress);
}
