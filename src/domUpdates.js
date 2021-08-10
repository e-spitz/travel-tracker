export const domUpdates = {

  displayTravelerName(traveler) {
    const greetingMsg = document.getElementById('greetingMsg');
    const firstName = traveler.name.split(' ')[0];
    greetingMsg.innerText = `Howdy, ${firstName}!`;
  },

  displayYearlyTotal(total) {
    const totalSpent = document.getElementById('totalSpent');
    const formatter = new Intl.NumberFormat('en-US', {
      style:'currency',
      currency: 'USD'
    });
    if (total !== 0) {
      totalSpent.innerText = `${formatter.format(total)}`;
    } else {
      totalSpent.innerText = 'None! Time to book a trip.';
    }
  },

  displayCardSectionHeader(header) {
    const newHeader = document.getElementById('tripCardsHeader')
    newHeader.innerText = `${header}`;
  },

  displayTripCards(travelerTrips, allDestinations) {
    let cardContainer = document.getElementById('tripCardsContainer')
    cardContainer.innerHTML = '';

    if (travelerTrips.length > 0) {
      travelerTrips.forEach(trip => {
        let destination = allDestinations.find(dest => dest.id === trip.destinationID)
        let splitDate = trip.date.split('/');
        let updateDate = `${splitDate[1]}/${splitDate[2]}/${splitDate[0]}`;
        let cardInfo = `
          <article class="trip-card">
            <div class="img-wrapper">
              <h3 class="destination-name">${destination.destination}</h3>
              <img class="trip-img" src=${destination.image} alt=${destination.alt}>
            </div>
            <p>departure date: ${updateDate}</p>
            <p>travelers: ${trip.travelers}</p>
            <p>duration: ${trip.duration} days</p>
            <p>status: ${trip.status}</p>
          </article>`;
          cardContainer.insertAdjacentHTML('beforeend', cardInfo);
        });
    } else {
      cardContainer.innerHTML = `<article class='no-trip'>You do not have any matching trips.</article>`
    }
  },

  loadBookingDestinations(allDestinations) {
    const destList = document.getElementById('destinationChoices')
    let destNames = allDestinations.sort((a, b) => a.destination.localeCompare(b.destination))
    destNames.forEach(d => {
      let destSelect = `
      <option class='form-fields' value='${d.id}' required>${d.destination}</option>`
      destList.insertAdjacentHTML('beforeend', destSelect)
    });
  },

  displayTripCostsModal(cost, perPerson) {
    const costModal = document.getElementById('costModal')
    this.toggleView(costModal);
    costModal.innerHTML = `
    <article class="modal-content" id='modalContent'>
    <span class="close-modal" id="closeModal">&times;</span>
      <div class='trip-costs' id='tripCosts'>
        <label for='trip-cost'>ESTIMATED TRIP COST:</label>
        <p class='trip-cost'>$${cost}</p>
        <label for='trip-cost-per-person'>COST PER PERSON:</label>
        <p class='trip-cost-per-person'>$${perPerson}</p>
      </div>
    </article>`;
  },

  hideModal() {
      const costModal = document.getElementById('costModal')
      this.toggleView(costModal)
  },


  hideBookingModal() {
    const bookModal = document.getElementById('bookModal')
    const bookingForm = document.getElementById('bookingForm')
    this.clearFormFields();
    this.toggleView(bookModal);
    this.toggleView(bookingForm);
  },

  displayBookingModal(newTrip, allDestinations) {
    const dest = this.findBookedDestination(newTrip, allDestinations)
    console.log('display d', dest);
    const bookModal = document.getElementById('bookModal')
    this.toggleView(bookModal)
    bookModal.innerHTML = `
    <article class="book-modal-content" id='bookModalContent'>
    <span class="book-close-modal" id="bookCloseModal">&times;</span>
      <div class='booking-confirm-msg'>
        <label for='booking-msg' class='booking-msg'>YOU JUST BOOKED A VACATION TO:</label>
        <p class='booking-msg-info'>${dest.destination} for ${newTrip.duration} days!</p>
      </div>
    </article>`;
  },

  findBookedDestination(newTrip, allDestinations) {
    const matchedDest = allDestinations.find(d => d.id === newTrip.destinationID)
    console.log('find d', matchedDest);
    return matchedDest;
  },

  clearFormFields() {
    const bookingForm = document.getElementById('bookingForm')
    bookingForm.reset();
  },

  toggleView(element) {
    element.classList.toggle('hidden')
  }

}
