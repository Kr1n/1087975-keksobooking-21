'use strict';

const mainPin = document.querySelector(`.map__pin--main`);

window.map.setNonActiveState();
window.form.setAddressValue(window.mainPin.offsetLeft + window.mainPin.width / 2, window.mainPin.offsetTop + window.mainPin.height);


