'use strict';

  window.filters = {
    applyFilters: applyFilters,
  }

  const type = document.querySelector('#housing-type');
  const price = document.querySelector('#housing-price');
  const rooms = document.querySelector('#housing-rooms');
  const guests = document.querySelector('#housing-guests');
  const features = document.querySelector('#housing-features');
  const featuresList = features.querySelectorAll('input');

  let filteredOffers;

  function applyFilters(offers){
    filteredOffers = applyTypeFilter(offers);
    filteredOffers = applyPriceFilter(filteredOffers);
    filteredOffers = applyRoomFilter(filteredOffers);
    filteredOffers = applyGuestFilter(filteredOffers);
    filteredOffers = applyFeatureFilter(filteredOffers);
    return filteredOffers;
  }

  const applyTypeFilter = (array) => {
    const filteredOffers = array.filter(item => {
      return (type.value === 'any') || (type.value === item.offer.type);
    });

    return filteredOffers;
  }

  const applyPriceFilter = (array) => {
    const filteredOffers = array.filter(item => {
      switch(price.value) {
        case 'low':
          return Number(item.offer.price) <= 10000;
        case 'middle':
          return (Number(item.offer.price) > 10000) && (Number(item.offer.price) <= 50000);
        case 'high':
          return Number(item.offer.price) > 50000;
        default:
          return true;
      }
    });

    return filteredOffers;
  }

  const applyRoomFilter = (array) => {
    const filteredOffers = array.filter(item => {
      return (rooms.value === 'any') || (rooms.value === item.offer.rooms.toString());
    });
    return filteredOffers;
  }

  const applyGuestFilter = (array) => {
    const filteredOffers = array.filter(item => {
      switch(guests.value) {
        case 'any':
          return true;
        case '0':
          return (Number(item.offer.guests) > 2) || (Number(item.offer.guests) === 0);
        default:
          return Number(guests.value) === item.offer.guests;
      }
    });
    return filteredOffers;
  }

  const applyFeatureFilter = (array) => {

    let selectedFeatures = [];
    featuresList.forEach(item => {
      if (item.checked) {
        selectedFeatures.push(item.defaultValue);
      }
    });

    if (!selectedFeatures.length) {
      return array;
    }

    const filteredOffers = array.filter(item => {
      let flag = true;

      selectedFeatures.every(selectedFeature => {
        return flag = (item.offer.features.indexOf(selectedFeature) !== -1);
      });

      return flag;
    });
    return filteredOffers;
  }

  const onFilterChange = (evt) => {
    window.pin.closePinCard();
    window.map.renderMapPins();
  }

  type.addEventListener('change', window.util.debounce(onFilterChange));
  price.addEventListener('change', window.util.debounce(onFilterChange));
  rooms.addEventListener('change', window.util.debounce(onFilterChange));
  guests.addEventListener('change', window.util.debounce(onFilterChange));
  features.addEventListener('change', window.util.debounce(onFilterChange));
