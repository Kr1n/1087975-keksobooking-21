'use strict';

window.card = {
  render,
};

const map = document.querySelector(`.map`);
const pinCardTemplate = document.querySelector(`#card`);

const types = {
  flat: `Квартира`,
  bungalow: `Бунгало`,
  house: `Дом`,
  palace: `Дворец`,
};

function create(offer) {
  let pinCard = pinCardTemplate.cloneNode(true).content;

  let type = types[offer.offer.type];

  let photosList = document.createDocumentFragment();
  let photoItem;
  offer.offer.photos.forEach((photo) => {
    photoItem = pinCard.querySelector(`.popup__photos img`).cloneNode(true);
    photoItem.src = photo;
    photosList.appendChild(photoItem);
  });

  let featuresList = document.createDocumentFragment();
  let featuresItem;
  offer.offer.features.forEach((feature) => {
    featuresItem = document.createElement(`li`);
    featuresItem.classList.add(`popup__feature`);
    featuresItem.classList.add(`popup__feature--` + feature);
    featuresList.appendChild(featuresItem);
  });

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

function render(offer) {
  let pinCards = map.querySelectorAll(`.map__card`);
  let element = document.createElement(`div`);

  pinCards.forEach((item) => item.remove());
  element.appendChild(create(offer));
  map.querySelector(`.map__filters-container`).insertAdjacentHTML(`beforebegin`, element.innerHTML);

  map.querySelector(`.popup__close`).addEventListener(`click`, (evt) => {
    window.pin.closeCard(evt.target);
  });
  map.querySelector(`.popup__close`).addEventListener(`keydown`, (evt) => {
    if (evt.key === `Enter`) {
      window.pin.closeCard();
    }
  });
  document.addEventListener(`keydown`, window.pin.onCardEscPress);
}
