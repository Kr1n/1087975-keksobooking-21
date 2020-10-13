"use strict";

(function() {

  let addressField = document.querySelector("#address");
  let formFieldsets = document.querySelectorAll(".ad-form fieldset");

  let roomNumber = document.querySelector("#room_number");
  let capacity = document.querySelector("#capacity");
  let typeField = document.querySelector("#type");
  let priceField = document.querySelector("#price");
  let timeinField = document.querySelector("#timein");
  let timeoutField = document.querySelector("#timeout");

  let errorMessage;
  let successMesasge;

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

  roomNumber.addEventListener("input", compareFields);
  capacity.addEventListener("input", compareFields);

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

  timeinField.addEventListener("input", evt => {
    timeoutField.options.selectedIndex = evt.target.options.selectedIndex;
  });

  timeoutField.addEventListener("input", evt => {
    timeinField.options.selectedIndex = evt.target.options.selectedIndex;
  });

  let onMessageEscPress = (evt) => {
    if (evt.key === "Escape") {
      evt.preventDefault();
      removeErrorMessage();
      document.removeEventListener("keydown", onMessageEscPress);
      document.removeEventListener("click", onClick);
    }
  }

  let onClick = (evt) => {
    removeErrorMessage();
    document.removeEventListener("keydown", onMessageEscPress);
    document.removeEventListener("click", onClick);
  }

  let removeErrorMessage = () => document.querySelector(".error").remove();

  let onErrorSubmit = (evt) => {
    const errorMessageTemplate = document.querySelector("#error");
    const mainElement = document.querySelector("main");
    mainElement.appendChild(errorMessageTemplate.cloneNode(true).content);

    errorMessage = document.querySelector(".error");
    document.addEventListener("keydown", onMessageEscPress);
    document.addEventListener("click", onClick);
  }

  let onSuccessSubmit = (evt) => {
    const successMessageTemplate = document.querySelector("#success");
    const mainElement = document.querySelector("main");
    mainElement.appendChild(successMessageTemplate.cloneNode(true).content);

    let successMesasge = document.querySelector(".success");
  }

  let form = document.querySelector(".ad-form");

  let submitHandler = (evt) => {
    evt.preventDefault();

    window.backend.save(
      new FormData(form),
      onSuccessSubmit,
      onErrorSubmit);
  };

  form.addEventListener("submit", submitHandler);

})();
