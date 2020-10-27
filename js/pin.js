'use strict';

const mainPin = document.querySelector('.map__pin--main');
const map = document.querySelector('.map');

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
  let popup = map.querySelector('.popup');

  if (popup) popup.classList.add('hidden');
  document.removeEventListener('keydown', onPinCardEscPress);
}

function onPinCardEscPress(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closePinCard();
  }
}

function onMainPinEnterPress(evt) {
  if (evt.key === 'Enter') {
    window.map.setActiveState();
  }
}

function onMainPinMousePress(evt) {
  if (typeof evt === 'object' && evt.button === 0) {
    window.map.setActiveState();
  }
}
