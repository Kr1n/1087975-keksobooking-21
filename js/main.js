function getRandomInt(min, max) {
  return Math.floor(min + Math.random() * Math.floor(max - min));
}

const map = document.querySelector(".map");
map.classList.remove("map--faded");

function createOffers(count = 8) {

  const offer_types = ["palace", "flat", "house", "bungalow"];
  const checkin_times = ["12:00", "13:00", "14:00"];
  const checkout_times = ["12:00", "13:00", "14:00"];
  const features = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
  const offer_photos = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];
  const offers = [];
  let locationX;
  let locationY;

  for (let i = 1; i <= count; i++) {

    locationX = getRandomInt(0, map.clientWidth);
    locationY = getRandomInt(130, 630);

    offers[i-1] = {
      "author": {
        "avatar": "img/avatars/user0" + (i) + ".png",
      },
      "offer": {
        "title": "Заголовок " + i,
        "address": locationX + ", " + locationY,
        "price": getRandomInt(1000, 3000),
        "type": offer_types[getRandomInt(0, offer_types.length)],
        "rooms": getRandomInt(1, 3),
        "guests": getRandomInt(1, 3),
        "checkin": checkin_times[getRandomInt(0, checkin_times.length)],
        "checkout": checkout_times[getRandomInt(0, checkout_times.length)],
        "features": features,
        "description": "Описанием " + i,
        "photos": offer_photos,
      },
      "location": {
        "x": locationX,
        "y": locationY,
      }
    }
  }
  return offers;
}

const mapPinTemplate = document.querySelector("#pin");

function renderPin(offer) {
  let mapPin = mapPinTemplate.cloneNode(true).content;

  mapPin.querySelector('.map__pin').style = "left: " + offer.location.x + "px; top: " + offer.location.y + "px;";
  mapPin.querySelector('img').src = offer.author.avatar;
  mapPin.querySelector('img').alt = offer.offer.title;
  return mapPin;
}

function createDom(offers) {
  let pinList = map.querySelector('.map__pins');
  let fragment = document.createDocumentFragment();

  for (let i = 0; i < offers.length; i++) {
    fragment.appendChild(renderPin(offers[i]));
  }
  pinList.appendChild(fragment);
}

createDom(createOffers(8));
