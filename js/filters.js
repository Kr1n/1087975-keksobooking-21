'use strict';

window.filters = {
  apply,
};

const type = document.querySelector(`#housing-type`);
const price = document.querySelector(`#housing-price`);
const rooms = document.querySelector(`#housing-rooms`);
const guests = document.querySelector(`#housing-guests`);
const features = document.querySelector(`#housing-features`);
const featuresList = features.querySelectorAll(`input`);

let filteredOffers;

function apply(offers) {
  filteredOffers = applyTypeFilter(offers);
  filteredOffers = applyPriceFilter(filteredOffers);
  filteredOffers = applyRoomFilter(filteredOffers);
  filteredOffers = applyGuestFilter(filteredOffers);
  filteredOffers = applyFeatureFilter(filteredOffers);
  return filteredOffers;
}

const applyTypeFilter = (items) => {
  const filteredArray = items.filter((item) => {
    return (type.value === `any`) || (type.value === item.offer.type);
  });

  return filteredArray;
};

const applyPriceFilter = (items) => {
  const filteredArray = items.filter((item) => {
    switch (price.value) {
      case `low`:
        return Number(item.offer.price) <= 10000;
      case `middle`:
        return (Number(item.offer.price) > 10000) && (Number(item.offer.price) <= 50000);
      case `high`:
        return Number(item.offer.price) > 50000;
      default:
        return true;
    }
  });

  return filteredArray;
};

const applyRoomFilter = (items) => {
  const filteredArray = items.filter((item) => {
    return (rooms.value === `any`) || (rooms.value === item.offer.rooms.toString());
  });
  return filteredArray;
};

const applyGuestFilter = (items) => {
  const filteredArray = items.filter((item) => {
    switch (guests.value) {
      case `any`:
        return true;
      case `0`:
        return (Number(item.offer.guests) > 2) || (Number(item.offer.guests) === 0);
      default:
        return Number(guests.value) === item.offer.guests;
    }
  });
  return filteredArray;
};

const applyFeatureFilter = (items) => {

  let selectedFeatures = [];
  featuresList.forEach((item) => {
    if (item.checked) {
      selectedFeatures.push(item.defaultValue);
    }
  });

  if (!selectedFeatures.length) {
    return items;
  }

  const filteredArray = items.filter((item) => {
    let flag = true;

    selectedFeatures.every((selectedFeature) => {
      return (item.offer.features.indexOf(selectedFeature) !== -1);
    });

    return flag;
  });
  return filteredArray;
};

const onFilterChange = () => {
  window.pin.closeCard();
  window.map.renderPins();
};

type.addEventListener(`change`, window.util.debounce(onFilterChange));
price.addEventListener(`change`, window.util.debounce(onFilterChange));
rooms.addEventListener(`change`, window.util.debounce(onFilterChange));
guests.addEventListener(`change`, window.util.debounce(onFilterChange));
features.addEventListener(`change`, window.util.debounce(onFilterChange));
