'use strict';

const WIDTH = 62;
const HEIGHT = 84;
const MIN_Y = 130;
const MAX_Y = 630;
const MIN_OFFSET_Y = MIN_Y - HEIGHT;
const MAX_OFFSET_Y = MAX_Y - HEIGHT;
const map = document.querySelector(`.map`);
const mainPin = document.querySelector(`.map__pin--main`);

let startCoords = {};
let dragged = false;

const move = (x, y) => {
  mainPin.style.top = ((Number(y)) ? y : mainPin.offsetTop) + `px`;
  mainPin.style.left = ((Number(x)) ? x : mainPin.offsetLeft) + `px`;
  window.form.setAddressValue(mainPin.offsetLeft + WIDTH / 2, mainPin.offsetTop + HEIGHT);
};

window.mainPin = {
  width: WIDTH,
  height: HEIGHT,
  move,
};

const onMouseDown = (evt) => {
  evt.preventDefault();

  dragged = false;

  startCoords = {
    x: evt.clientX,
    y: evt.clientY,
  };

  document.addEventListener(`mousemove`, onMouseMove);
  document.addEventListener(`mouseup`, onMouseUp);
};

mainPin.addEventListener(`mousedown`, onMouseDown);

const onMouseUp = (evt) => {
  evt.preventDefault();

  document.removeEventListener(`mousemove`, onMouseMove);
  document.removeEventListener(`mouseup`, onMouseUp);

  if (dragged) {
    const onClickPreventDefault = (clickEvt) => {
      clickEvt.preventDefault();
      mainPin.removeEventListener(`click`, onClickPreventDefault);
    };
    mainPin.addEventListener(`click`, onClickPreventDefault);
  }
};

const onMouseMove = (evt) => {
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

  if (offsetX < (-WIDTH / 2)) {
    offsetX = -WIDTH / 2;
  } else if (offsetX > (map.offsetWidth - WIDTH / 2)) {
    offsetX = map.offsetWidth - WIDTH / 2;
  }

  let offsetY = mainPin.offsetTop - shift.y;

  if (offsetY < MIN_OFFSET_Y) {
    offsetY = MIN_OFFSET_Y;
  } else if (offsetY > MAX_OFFSET_Y) {
    offsetY = MAX_OFFSET_Y;
  }

  mainPin.style.top = offsetY + `px`;
  mainPin.style.left = offsetX + `px`;

  window.form.setAddressValue(mainPin.offsetLeft + WIDTH / 2, mainPin.offsetTop + HEIGHT);
};
