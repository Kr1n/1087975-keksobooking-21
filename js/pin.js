'use strict';

const map = document.querySelector(`.map`);

const PIN_WIDTH = 50;
const PIN_HEIGHT = 70;

window.pin = {
  onCardEscPress,
  onMainEnterPress,
  onMainMousePress,
  closeCard,
  width: PIN_WIDTH,
  height: PIN_HEIGHT,
};

function closeCard() {
  let popup = map.querySelector(`.popup`);

  if (popup) {
    popup.classList.add(`hidden`);
  }
  document.removeEventListener(`keydown`, onCardEscPress);
}

function onCardEscPress(evt) {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    closeCard();
  }
}

function onMainEnterPress(evt) {
  if (evt.key === `Enter`) {
    window.map.setActiveState();
  }
}

function onMainMousePress(evt) {
  if (typeof evt === `object` && evt.button === 0) {
    window.map.setActiveState();
  }
}
