/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
(() => {
/*!********************!*\
  !*** ./js/util.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


(function() {

  window.util = {
    getRandomInt: (min, max) => Math.floor(min + Math.random() * Math.floor(max - min)),
    removeAllChildNodes: parent => {while (parent.firstChild) { parent.removeChild(parent.firstChild); }},
  }
})();

})();

(() => {
/*!********************!*\
  !*** ./js/data.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


(function() {

  const map = document.querySelector(".map");

  const offerTypes = ["palace", "flat", "house", "bungalow"];
  const checkinTimes = ["12:00", "13:00", "14:00"];
  const checkoutTimes = ["12:00", "13:00", "14:00"];
  const features = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
  const offerPhotos = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];
  const offers = [];

  window.data = {
    createOffersArray: function (count = 8) {
      let locationX;
      let locationY;

      for (let i = 1; i <= count; i++) {

        locationX = window.util.getRandomInt(window.pin.pinWidth / 2, map.clientWidth - window.pin.pinWidth / 2);
        locationY = window.util.getRandomInt(130, 630);

        offers[i - 1] = {
          "author": {
            "avatar": "img/avatars/user0" + (i) + ".png",
          },
          "offer": {
            "title": "Заголовок " + i,
            "address": locationX + ", " + locationY,
            "price": window.util.getRandomInt(1000, 3000),
            "type": offerTypes[window.util.getRandomInt(0, offerTypes.length)],
            "rooms": window.util.getRandomInt(1, 3),
            "guests": window.util.getRandomInt(1, 3),
            "checkin": checkinTimes[window.util.getRandomInt(0, checkinTimes.length)],
            "checkout": checkoutTimes[window.util.getRandomInt(0, checkoutTimes.length)],
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
    },
    offers: offers,
  }
})();

})();

(() => {
/*!***********************!*\
  !*** ./js/backend.js ***!
  \***********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


(function () {

  const urlData = 'https://21.javascript.pages.academy/keksobooking/data';
  const urlSave = 'https://21.javascript.pages.academy/keksobooking';
  const StatusCode = {
    OK: 200
  };
  const TIMEOUT_IN_MS = 5000;

  window.backend = {
    load: function (onSuccess, onError) {
      if (!onError) onError = errorHandler;
      let xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === StatusCode.OK) {
          onSuccess(xhr.response);
        } else {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = TIMEOUT_IN_MS;

      xhr.open('GET', urlData);
      xhr.send();
    },
    save: function (data, onSuccess, onError) {
      if (!onError) onError = errorHandler;
      console.log("save function");
      console.log(data);
      let xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === StatusCode.OK) {
          onSuccess(xhr.response);
        } else {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = TIMEOUT_IN_MS;

      xhr.open('POST', urlSave);
      xhr.send(data);
    },
  }

  function errorHandler(errorMessage) {
    let node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

})();

})();

(() => {
/*!***********************!*\
  !*** ./js/filters.js ***!
  \***********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


(function() {

  window.filters = {
    applyFilters: applyFilters,
  }

  function applyFilters(offers) {
    const type = document.querySelector("#housing-type").value;

    const sameTypeOffers = offers.filter(item => {
      return (type === "any") || (item.offer.type === type);
    });

    return sameTypeOffers;
  }

  function onFilterChange(evt) {
    window.pin.closePinCard();
    window.map.renderMapPins();
  }

  const type = document.querySelector("#housing-type");
  type.addEventListener("change", onFilterChange);

}());

})();

(() => {
/*!********************!*\
  !*** ./js/card.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


(function () {

  window.card = {
    createPinCard: createPinCard,
    renderPinCard: renderPinCard,
  }

  const map = document.querySelector(".map");
  const pinCardTemplate = document.querySelector("#card");

  const types = {
    "flat": "Квартира",
    "bungalow": "Бунгало",
    "house": "Дом",
    "palace": "Дворец",
  }

  function createPinCard(offer) {
    let pinCard = pinCardTemplate.cloneNode(true).content;

    let type = types[offer.offer.type];

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

    map.querySelector(".popup__close").addEventListener("click", function (evt) { window.pin.closePinCard(evt.target); });
    map.querySelector(".popup__close").addEventListener("keydown", function (evt) { if (evt.key === "Enter") { window.pin.closePinCard(); }});
    document.addEventListener("keydown", window.pin.onPinCardEscPress);
  }
})();

})();

(() => {
/*!*******************!*\
  !*** ./js/pin.js ***!
  \*******************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


(function() {

  const mainPin = document.querySelector(".map__pin--main");
  const map = document.querySelector(".map");

  const pinWidth = 50;
  const pinHeight = 70;

  window.pin = {
    onPinCardEscPress: onPinCardEscPress,
    onMainPinEnterPress: onMainPinEnterPress,
    onMainPinMousePress: onMainPinMousePress,
    closePinCard: closePinCard,
    pinWidth: pinWidth,
    pinHeight: pinHeight,
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
      window.map.setActiveState();
    }
  }

  function onMainPinMousePress(evt) {
    if (typeof evt === "object" && evt.button === 0) {
      window.map.setActiveState();
    }
  }

})();

})();

(() => {
/*!*******************!*\
  !*** ./js/map.js ***!
  \*******************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


(function() {

  const mapPinTemplate = document.querySelector("#pin");
  const map = document.querySelector(".map");
  const formFieldsets = document.querySelectorAll(".ad-form fieldset");
  const mapFilters = document.querySelectorAll(".map__filters > *");
  const form = document.querySelector(".ad-form");
  const mainPin = document.querySelector(".map__pin--main");
  map.classList.remove("map--faded");

  const MAX_RENDERED_PINS = 5;

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

  function clearMapPins() {
    let pins = map.querySelectorAll(".map__pins button");
    pins.forEach(element => {if (!element.classList.contains("map__pin--main")) element.remove()});
  }

  function renderMapPins() {
    clearMapPins();
    let pinList = map.querySelector(".map__pins");
    let fragment = document.createDocumentFragment();

    let offers = window.filters.applyFilters(window.data.offers);
    const pinCount = (MAX_RENDERED_PINS < offers.length) ? 5 : offers.length;

    for (let i = 0; i < pinCount; i++) {
      fragment.appendChild(createMapPin(offers[i]));
    }
    pinList.appendChild(fragment);

    let pins = map.querySelectorAll(".map__pin");
    for (let i = 0; i < pinCount; i++) {
      pins[i + 1].addEventListener("click", () => window.card.renderPinCard(offers[i]));
    }
  }

  function successHandler(offers) {
    window.data = { offers: offers }
    renderMapPins();
  };

  function setActiveState() {
    formFieldsets.forEach(item => item.disabled = false);
    mapFilters.forEach(item => item.disabled = false);
    form.classList.remove("ad-form--disabled");
    map.classList.remove("map--faded");
    window.backend.load(successHandler);
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

})();

(() => {
/*!********************!*\
  !*** ./js/form.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


(function() {

  let addressField = document.querySelector("#address");
  let formFieldsets = document.querySelectorAll(".ad-form fieldset");

  let roomNumber = document.querySelector("#room_number");
  let capacity = document.querySelector("#capacity");
  let typeField = document.querySelector("#type");
  let priceField = document.querySelector("#price");
  let timeinField = document.querySelector("#timein");
  let timeoutField = document.querySelector("#timeout");

  let message;

  window.form = {
    setAddressValue: setAddressValue,
  }

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

  function setAddressValue(x, y) {
    addressField.value = Math.floor(x) + ", " + Math.floor(y);
  }

  roomNumber.addEventListener("input", compareFields);
  capacity.addEventListener("input", compareFields);

  typeField.addEventListener("input", evt => {
    switch (evt.target.options.selectedIndex) {
      case 0:
      priceField.setAttribute("min", "0");
      break;
      case 1:
      priceField.setAttribute("min", "1000");
      break;
      case 2:
      priceField.setAttribute("min", "5000");
      break;
      case 3:
      priceField.setAttribute("min", "10000");
      break;
      default:
      priceField.setAttribute("min", "0");
    }
  });

  timeinField.addEventListener("input", evt => {
    timeoutField.options.selectedIndex = evt.target.options.selectedIndex;
  });

  timeoutField.addEventListener("input", evt => {
    timeinField.options.selectedIndex = evt.target.options.selectedIndex;
  });

  let onMessageEscPress = (evt) => {
    if (evt.key === "Escape") {
      evt.preventDefault();
      removeMessage();
      document.removeEventListener("keydown", onMessageEscPress);
      document.removeEventListener("click", onClick);
    }
  }

  let onClick = (evt) => {
    removeMessage();
    document.removeEventListener("keydown", onMessageEscPress);
    document.removeEventListener("click", onClick);
  }

  let removeMessage = () => message.remove();

  let onErrorSubmit = (evt) => {
    const errorMessageTemplate = document.querySelector("#error");
    const mainElement = document.querySelector("main");
    mainElement.appendChild(errorMessageTemplate.cloneNode(true).content);

    message = document.querySelector(".error");
    document.addEventListener("keydown", onMessageEscPress);
    document.addEventListener("click", onClick);
  }

  let removeSuccessMessage = () => document.querySelector(".success").remove();

  let onSuccessSubmit = (evt) => {
    const successMessageTemplate = document.querySelector("#success");
    const mainElement = document.querySelector("main");
    mainElement.appendChild(successMessageTemplate.cloneNode(true).content);

    message = document.querySelector(".success");
    document.addEventListener("keydown", onMessageEscPress);
    document.addEventListener("click", onClick);
  }

  let form = document.querySelector(".ad-form");

  let submitHandler = (evt) => {
    evt.preventDefault();

    window.backend.save(
      new FormData(form),
      onSuccessSubmit,
      onErrorSubmit);
  };

  form.addEventListener("submit", submitHandler);

  const mainPin = document.querySelector(".map__pin--main");
  let resetButton = document.querySelector(".ad-form__reset");

  let reset = (evt) => {
    evt.preventDefault();

    window.form.setAddressValue(mainPin.offsetLeft + document.mainPin.mainPinWidth / 2, mainPin.offsetTop + document.mainPin.mainPinHeight);
    document.querySelector("#title").value = "";
    document.querySelector("#type").selectedIndex = 1;
    document.querySelector("#price").value = "";
    document.querySelector("#room_number").selectedIndex = 0;
    document.querySelector("#capacity").selectedIndex = 2;
    document.querySelector("#description").value = "";
    document.querySelector("#timein").selectedIndex = 0;
    document.querySelector("#timeout").selectedIndex = 0;
    document.querySelector("#avatar").value = "";
    document.querySelector("#images").value = "";

    document.querySelectorAll(".features input").forEach(element => element.checked = 0);
  }

  resetButton.addEventListener("click", reset);
})();

})();

(() => {
/*!***********************!*\
  !*** ./js/mainPin.js ***!
  \***********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


(function () {

  const map = document.querySelector(".map");
  let mainPin = document.querySelector(".map__pin--main");
  let startCoords = {};
  let dragged = false;

  let mainPinWidth = 62;
  let mainPinHeight = 84

  document.mainPin = {
    mainPinWidth: mainPinWidth,
    mainPinHeight: mainPinHeight
  }

  const MIN_OFFSET_Y = 130 - mainPinHeight;
  const MAX_OFFSET_Y = 630 - mainPinHeight;

  mainPin.addEventListener("mousedown", onMouseDown);

  function onMouseDown(evt) {
    evt.preventDefault();

    dragged = false;

    startCoords = {
      x: evt.clientX,
      y: evt.clientY,
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  function onMouseUp(evt) {
    evt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

    if (dragged) {
      var onClickPreventDefault = function (clickEvt) {
        clickEvt.preventDefault();
        mainPin.removeEventListener('click', onClickPreventDefault)
      };
      mainPin.addEventListener('click', onClickPreventDefault);
    }
  }

  function onMouseMove(evt) {
    dragged = true;

    let shift = {
      x: startCoords.x - evt.clientX,
      y: startCoords.y - evt.clientY
    };

    startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    let offsetX = mainPin.offsetLeft - shift.x;

    if (offsetX <  (-mainPinWidth / 2)) {
      offsetX =  -mainPinWidth / 2 ;
    } else if (offsetX > (map.offsetWidth - mainPinWidth / 2)) {
      offsetX = map.offsetWidth - mainPinWidth / 2;
    }

    let offsetY = mainPin.offsetTop - shift.y;

    if (offsetY < MIN_OFFSET_Y) {
      offsetY = MIN_OFFSET_Y ;
    } else if (offsetY > MAX_OFFSET_Y) {
      offsetY = MAX_OFFSET_Y ;
    }

    mainPin.style.top = offsetY + 'px';
    mainPin.style.left = offsetX + 'px';

    window.form.setAddressValue(mainPin.offsetLeft + mainPinWidth / 2, mainPin.offsetTop + mainPinHeight);
  }

})();

})();

(() => {
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


(function() {

  const mainPin = document.querySelector(".map__pin--main");

  window.map.setNonActiveState();
  window.form.setAddressValue(mainPin.offsetLeft + document.mainPin.mainPinWidth / 2, mainPin.offsetTop + document.mainPin.mainPinHeight);

})();

})();

/******/ })()
;