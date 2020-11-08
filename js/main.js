'use strict';

const mainPin = document.querySelector(`.map__pin--main`);

window.map.setNonActiveState();
window.form.setAddressValue(mainPin.offsetLeft + window.mainPin.width / 2, mainPin.offsetTop + window.mainPin.height);


