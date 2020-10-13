"use strict";

(function() {

  let addressField = document.querySelector("#address");
  let formFieldsets = document.querySelectorAll(".ad-form fieldset");

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

  let roomNumber = document.querySelector("#room_number");
  let capacity = document.querySelector("#capacity");

  roomNumber.addEventListener("input", compareFields);
  capacity.addEventListener("input", compareFields);


  let typeField = document.querySelector("#type");
  let priceField = document.querySelector("#price");

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

  let timeinField = document.querySelector("#timein");
  let timeoutField = document.querySelector("#timeout");

  timeinField.addEventListener("input", evt => {
    timeoutField.options.selectedIndex = evt.target.options.selectedIndex;
  });

  timeoutField.addEventListener("input", evt => {
    timeinField.options.selectedIndex = evt.target.options.selectedIndex;
  });

})();
