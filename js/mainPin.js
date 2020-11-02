'use strict';

const map = document.querySelector(`.map`);
let mainPin = document.querySelector(`.map__pin--main`);
let startCoords = {};
let dragged = false;

let mainPinWidth = 62;
let mainPinHeight = 84;

document.mainPin = {
  mainPinWidth: mainPinWidth,
  mainPinHeight: mainPinHeight
};

const MIN_OFFSET_Y = 130 - mainPinHeight;
const MAX_OFFSET_Y = 630 - mainPinHeight;

mainPin.addEventListener(`mousedown`, onMouseDown);

let onMouseDown = (evt) => {
  evt.preventDefault();

  dragged = false;

  startCoords = {
    x: evt.clientX,
    y: evt.clientY,
  };

  document.addEventListener(`mousemove`, onMouseMove);
  document.addEventListener(`mouseup`, onMouseUp);
};

let onMouseUp = (evt) => {
  evt.preventDefault();

  document.removeEventListener(`mousemove`, onMouseMove);
  document.removeEventListener(`mouseup`, onMouseUp);

  if (dragged) {
    let onClickPreventDefault = (clickEvt) => {
      clickEvt.preventDefault();
      mainPin.removeEventListener(`click`, onClickPreventDefault);
    };
    mainPin.addEventListener(`click`, onClickPreventDefault);
  }
};

let onMouseMove = (evt) => {
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

  if (offsetX < (-mainPinWidth / 2)) {
    offsetX = -mainPinWidth / 2;
  } else if (offsetX > (map.offsetWidth - mainPinWidth / 2)) {
    offsetX = map.offsetWidth - mainPinWidth / 2;
  }

  let offsetY = mainPin.offsetTop - shift.y;

  if (offsetY < MIN_OFFSET_Y) {
    offsetY = MIN_OFFSET_Y;
  } else if (offsetY > MAX_OFFSET_Y) {
    offsetY = MAX_OFFSET_Y;
  }

  mainPin.style.top = offsetY + `px`;
  mainPin.style.left = offsetX + `px`;

  window.form.setAddressValue(mainPin.offsetLeft + mainPinWidth / 2, mainPin.offsetTop + mainPinHeight);
};
