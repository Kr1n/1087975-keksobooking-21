"use strict";

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

  const MIN_OFFSET_Y = 130 - document.mainPin.mainPinHeight;
  const MAX_OFFSET_Y = 630 - document.mainPin.mainPinHeight;

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

    if (offsetX <  (-document.mainPin.mainPinWidth / 2)) {
      offsetX =  -document.mainPin.mainPinWidth / 2 ;
    } else if (offsetX > (map.offsetWidth  - document.mainPin.mainPinWidth / 2)) {
      offsetX = map.offsetWidth - document.mainPin.mainPinWidth / 2;
    }

    let offsetY = mainPin.offsetTop - shift.y;

    if (offsetY < MIN_OFFSET_Y) {
      offsetY = MIN_OFFSET_Y ;
    } else if (offsetY > MAX_OFFSET_Y) {
      offsetY = MAX_OFFSET_Y ;
    }

    mainPin.style.top = offsetY + 'px';
    mainPin.style.left = offsetX + 'px';

    window.form.setAddressValue(mainPin.offsetLeft + document.mainPin.mainPinWidth / 2, mainPin.offsetTop + document.mainPin.mainPinHeight);
  }

})();
