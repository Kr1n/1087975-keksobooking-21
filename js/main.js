"use strict";

function getRandomInt(min, max) {
  return Math.floor(min + Math.random() * Math.floor(max - min));
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

//===================================================
// Map Pins
const pinCardTemplate = document.querySelector("#card");
const mapPinTemplate = document.querySelector("#pin");
const map = document.querySelector(".map");
const pinWidth = 50;
const pinHeight = 70;

const mainPinWidth = 62;
const mainPinHeight = 84;

const offerArray = createOffersArray(8);

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

  pinList = map.querySelectorAll(".map__pin");

  for (let i = 1; i < pinList.length; i++) {
    pinList[i].addEventListener("click", () => renderPinCard(offerArray[i - 1]));
  }
}

//===================================================
// Pin Cards
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
  removeAllChildNodes(photos);
  photos.appendChild(photosList);

  let features = pinCard.querySelector(".popup__features");
  removeAllChildNodes(features);
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
};

//===================================================
// State
let mainPin = document.querySelector(".map__pin--main");
let form = document.querySelector(".ad-form");
let formFieldsets = document.querySelectorAll(".ad-form fieldset");
let mapFilters = document.querySelectorAll(".map__filters > *");
let addressField = document.querySelector("#address");

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
  mainPin.addEventListener("mousedown", onMainPinMousePress);
  mainPin.addEventListener("keydown", onMainPinMousePress);
}

function setAddressValue(x, y) {
  addressField.value = Math.floor(x) + ", " + Math.floor(y);
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

setNonActiveState();
setAddressValue(mainPin.offsetLeft + mainPinWidth / 2, mainPin.offsetTop + mainPinHeight);

//===================================================
// Validation
let roomNumber = document.querySelector("#room_number");
let capacity = document.querySelector("#capacity");

function compareFields() {
  let capacityValue = capacity[capacity.selectedIndex].value;
  let roomNumberValue = roomNumber[roomNumber.selectedIndex].value;

  if (capacityValue === "0" && roomNumberValue === "100") {
    capacity.setCustomValidity("");
  } else if (capacityValue !== roomNumberValue) {
    capacity.setCustomValidity("Количество гостей и комнат не совпадает");
  } else {
    capacity.setCustomValidity("");
  }
}

roomNumber.addEventListener("input", compareFields);
capacity.addEventListener("input", compareFields);
