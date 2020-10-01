"use strict";

function getRandomInt(min, max) {
  return Math.floor(min + Math.random() * Math.floor(max - min));
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

const pinCardTemplate = document.querySelector("#card");
const mapPinTemplate = document.querySelector("#pin");
const map = document.querySelector(".map");
const pinWidth = 50;
const pinHeight = 70;

const offerArray = createOffersArray(8);

map.classList.remove("map--faded");

function createOffersArray(count = 8) {

  const offerTypes = ["palace", "flat", "house", "bungalow"];
  const checkinTimes = ["12:00", "13:00", "14:00"];
  const checkoutTimes = ["12:00", "13:00", "14:00"];
  const features = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
  const offerPhotos = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];
  const offers = [];
  let locationX;
  let locationY;

  for (let i = 1; i <= count; i++) {

    locationX = getRandomInt(pinWidth / 2, map.clientWidth - pinWidth / 2);
    locationY = getRandomInt(130, 630);

    offers[i - 1] = {
      "author": {
        "avatar": "img/avatars/user0" + (i) + ".png",
      },
      "offer": {
        "title": "Заголовок " + i,
        "address": locationX + ", " + locationY,
        "price": getRandomInt(1000, 3000),
        "type": offerTypes[getRandomInt(0, offerTypes.length)],
        "rooms": getRandomInt(1, 3),
        "guests": getRandomInt(1, 3),
        "checkin": checkinTimes[getRandomInt(0, checkinTimes.length)],
        "checkout": checkoutTimes[getRandomInt(0, checkoutTimes.length)],
        "features": features,
        "description": "Описание " + i,
        "photos": offerPhotos,
      },
      "location": {
        "x": locationX,
        "y": locationY,
      },
    };
  }

  return offers;
}

function createMapPin(offer) {
  let mapPin = mapPinTemplate.cloneNode(true).content;

  mapPin.querySelector(".map__pin").style = "left: " + (offer.location.x - pinWidth / 2) + "px; top: " + (offer.location.y - pinHeight) + "px;";
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
    featuresItem  = document.createElement("li");
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
  removeAllChildNodes(photos);
  photos.appendChild(photosList);

  let features = pinCard.querySelector(".popup__features");
  removeAllChildNodes(features);
  features.appendChild(featuresList);

  return pinCard;
}

function renderPinCard(offers) {
  let element = document.createElement("div");
  element.appendChild(createPinCard(offers[0]));
  map.querySelector(".map__filters-container").insertAdjacentHTML("beforebegin", element.innerHTML);
}

renderMapPins(offerArray);
renderPinCard(offerArray);
