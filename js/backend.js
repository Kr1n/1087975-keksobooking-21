'use strict';

const URL_DATA = `https://21.javascript.pages.academy/keksobooking/data`;
const URL_SAVE = `https://21.javascript.pages.academy/keksobooking`;
const STATUS_CODE = {
  OK: 200
};
const TIMEOUT_IN_MS = 5000;

window.backend = {
  load: (onSuccess, onError) => {
    if (!onError) {
      onError = errorHandler;
    }
    let xhr = new XMLHttpRequest();
    createXhrConnection(xhr, onSuccess, onError);

    xhr.open(`GET`, URL_DATA);
    xhr.send();
  },
  save: (data, onSuccess, onError) => {
    if (!onError) {
      onError = errorHandler;
    }
    let xhr = new XMLHttpRequest();
    createXhrConnection(xhr, onSuccess, onError);

    xhr.open(`POST`, URL_SAVE);
    xhr.send(data);
  },
};

const createXhrConnection = (xhr, onSuccess, onError) => {
  xhr.responseType = `json`;

  xhr.addEventListener(`load`, function () {
    if (xhr.status === STATUS_CODE.OK) {
      onSuccess(xhr.response);
    } else {
      onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
    }
  });

  xhr.addEventListener(`error`, function () {
    onError(`Произошла ошибка соединения`);
  });

  xhr.addEventListener(`timeout`, function () {
    onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
  });

  xhr.timeout = TIMEOUT_IN_MS;
};

const errorHandler = (message) => {
  let node = document.createElement(`div`);
  node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
  node.style.position = `absolute`;
  node.style.left = 0;
  node.style.right = 0;
  node.style.fontSize = `30px`;
  node.classList.add(`error-message`);

  node.textContent = message;

  setTimeout(() => {
    let errorMessage = document.querySelector(`.error-message`);
    errorMessage.remove();
  }, 5000);

  document.body.insertAdjacentElement(`afterbegin`, node);
};
