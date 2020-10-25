'use strict';

(function() {

  window.filters = {
    applyFilters: applyFilters,
  }

  function applyFilters(offers) {
    const type = document.querySelector('#housing-type').value;

    const sameTypeOffers = offers.filter(item => {
      return (type === 'any') || (item.offer.type === type);
    });

    return sameTypeOffers;
  }

  function onFilterChange(evt) {
    window.pin.closePinCard();
    window.map.renderMapPins();
  }

  const type = document.querySelector('#housing-type');
  type.addEventListener('change', onFilterChange);

}());
