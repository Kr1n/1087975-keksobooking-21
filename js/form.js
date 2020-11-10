'use strict';

(function () {

  const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];

  const mainPin = document.querySelector(`.map__pin--main`);
  const resetButton = document.querySelector(`.ad-form__reset`);
  const form = document.querySelector(`.ad-form`);

  const addressField = document.querySelector(`#address`);

  const roomNumber = document.querySelector(`#room_number`);
  const capacity = document.querySelector(`#capacity`);
  const typeField = document.querySelector(`#type`);
  const priceField = document.querySelector(`#price`);
  const timeinField = document.querySelector(`#timein`);
  const timeoutField = document.querySelector(`#timeout`);

  const avatarFileChooser = document.querySelector(`.ad-form__field input[type=file]`);
  const avatarPreview = document.querySelector(`.ad-form-header__preview img`);

  const imageFileChooser = document.querySelector(`.ad-form__upload input[type=file]`);
  const imagePreview = document.querySelector(`.ad-form__photo`);

  let message;

  window.form = {
    setAddressValue,
    reset,
  };

  const showPictureFromInput = (file, preview) => {

    let fileName = file.name.toLowerCase();

    let matches = FILE_TYPES.some((it) => {
      return fileName.endsWith(it);
    });

    if (matches) {
      let reader = new FileReader();

      reader.addEventListener(`load`, () => {
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  avatarFileChooser.addEventListener(`change`, () => {
    showPictureFromInput(avatarFileChooser.files[0], avatarPreview);
  });

  imageFileChooser.addEventListener(`change`, () => {
    let imageElement = document.createElement(`img`);
    imageElement.setAttribute(`width`, `70`);
    imageElement.setAttribute(`height`, `70`);
    imageElement.setAttribute(`alt`, `Предпросмотр картинки пользователя`);
    imagePreview.appendChild(imageElement);

    showPictureFromInput(imageFileChooser.files[0], imagePreview.querySelector(`img`));
  });

  const compareFieldsHandler = () => {
    const capacityValue = capacity[capacity.selectedIndex].value;
    const roomNumberValue = roomNumber[roomNumber.selectedIndex].value;

    if (capacityValue === `0` && roomNumberValue === `100`) {
      capacity.setCustomValidity(``);
    } else if (capacityValue !== roomNumberValue) {
      capacity.setCustomValidity(`Количество гостей и комнат не совпадает`);
    } else {
      capacity.setCustomValidity(``);
    }
  };

  function setAddressValue(x, y) {
    addressField.value = Math.floor(x) + `, ` + Math.floor(y);
  }

  roomNumber.addEventListener(`input`, compareFieldsHandler);
  capacity.addEventListener(`input`, compareFieldsHandler);

  typeField.addEventListener(`input`, (evt) => {

    let minPrice = 0;
    let placeholder = 0;

    switch (evt.target.options.selectedIndex) {
      case 0:
        minPrice = 0;
        placeholder = 0;
        break;
      case 1:
        minPrice = 1000;
        placeholder = 1000;
        break;
      case 2:
        minPrice = 5000;
        placeholder = 5000;
        break;
      case 3:
        minPrice = 10000;
        placeholder = 10000;
        break;
      default:
    }
    priceField.setAttribute(`placeholder`, placeholder);
    priceField.setAttribute(`min`, minPrice);
  });

  timeinField.addEventListener(`input`, (evt) => {
    timeoutField.options.selectedIndex = evt.target.options.selectedIndex;
  });

  timeoutField.addEventListener(`input`, (evt) => {
    timeinField.options.selectedIndex = evt.target.options.selectedIndex;
  });

  const onMessageEscPress = (evt) => {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      removeMessage();
      document.removeEventListener(`keydown`, onMessageEscPress);
      document.removeEventListener(`click`, onClick);
    }
  };

  const onClick = () => {
    removeMessage();
    document.removeEventListener(`keydown`, onMessageEscPress);
    document.removeEventListener(`click`, onClick);
  };

  const removeMessage = () => message.remove();

  const onErrorSubmit = () => {
    const errorMessageTemplate = document.querySelector(`#error`);
    const mainElement = document.querySelector(`main`);
    mainElement.appendChild(errorMessageTemplate.cloneNode(true).content);

    message = document.querySelector(`.error`);
    document.addEventListener(`keydown`, onMessageEscPress);
    document.addEventListener(`click`, onClick);
  };

  const onSuccessSubmit = () => {
    const successMessageTemplate = document.querySelector(`#success`);
    const mainElement = document.querySelector(`main`);
    mainElement.appendChild(successMessageTemplate.cloneNode(true).content);

    message = document.querySelector(`.success`);
    document.addEventListener(`keydown`, onMessageEscPress);
    document.addEventListener(`click`, onClick);
    window.page.reset();
  };

  const submitHandler = (evt) => {
    evt.preventDefault();

    window.backend.save(
        new FormData(form),
        onSuccessSubmit,
        onErrorSubmit);
  };
  form.addEventListener(`submit`, submitHandler);

  function reset(evt) {
    if (evt) {
      evt.preventDefault();
    }

    window.form.setAddressValue(mainPin.offsetLeft + window.mainPin.width / 2, mainPin.offsetTop + window.mainPin.height);
    document.querySelector(`#title`).value = ``;
    document.querySelector(`#type`).selectedIndex = 1;
    document.querySelector(`#price`).value = ``;
    document.querySelector(`#room_number`).selectedIndex = 0;
    document.querySelector(`#capacity`).selectedIndex = 2;
    document.querySelector(`#description`).value = ``;
    document.querySelector(`#timein`).selectedIndex = 0;
    document.querySelector(`#timeout`).selectedIndex = 0;
    document.querySelector(`#avatar`).value = ``;
    document.querySelector(`#images`).value = ``;
    document.querySelector(`.ad-form-header__preview img`).src = `img/muffin-grey.svg`;

    while (imagePreview.firstChild) {
      imagePreview.removeChild(imagePreview.firstChild);
    }

    document.querySelectorAll(`.features input`).forEach((element) => {
      element.checked = 0;
    });
  }
  resetButton.addEventListener(`click`, window.page.reset);

})();
