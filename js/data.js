'use strict';

const map = document.querySelector(`.map`);

const offerTypes = [`palace`, `flat`, `house`, `bungalow`];
const checkinTimes = [`12:00`, `13:00`, `14:00`];
const checkoutTimes = [`12:00`, `13:00`, `14:00`];
const features = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const offerPhotos = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const offers = [];

window.data = {
  createOffersArray: (count = 8) => {
    let locationX;
    let locationY;

    for (let i = 1; i <= count; i++) {

      locationX = window.util.getRandomInt(window.pin.pinWidth / 2, map.clientWidth - window.pin.pinWidth / 2);
      locationY = window.util.getRandomInt(130, 630);

      offers[i - 1] = {
        author: {
          avatar: `img/avatars/user0` + (i) + `.png`,
        },
        offer: {
          title: `Заголовок ` + i,
          address: locationX + `, ` + locationY,
          price: window.util.getRandomInt(1000, 3000),
          type: offerTypes[window.util.getRandomInt(0, offerTypes.length)],
          rooms: window.util.getRandomInt(1, 3),
          guests: window.util.getRandomInt(1, 3),
          checkin: checkinTimes[window.util.getRandomInt(0, checkinTimes.length)],
          checkout: checkoutTimes[window.util.getRandomInt(0, checkoutTimes.length)],
          features: features,
          description: `Описание ` + i,
          photos: offerPhotos,
        },
        location: {
          x: locationX,
          y: locationY,
        },
      };
    }
    return offers;
  },
  offers: offers,
};
