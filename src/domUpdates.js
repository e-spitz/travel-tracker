export const domUpdates = {

  displayTravelerName(traveler) {
    const greetingMsg = document.getElementById('greetingMsg');
    const firstName = traveler.name.split(' ')[0];
    greetingMsg.innerText = `Hey there, ${firstName}!`;
  },

  displayYearlyTotal(total) {
    const totalSpent = document.getElementById('totalSpent');
    const formatter = new Intl.NumberFormat('en-US', {
      style:'currency',
      currency: 'USD'
    })
    totalSpent.innerText = `${formatter.format(total)}`;
  },

  displayCardSectionHeader(header) {
    const newHeader = document.getElementById('tripCardsHeader')
    newHeader.innerText = `${header}`;
  },

  displayTripCards(travelerTrips, allDestinations) {
    let cardContainer = document.getElementById('tripsCardContainer')
    cardContainer.innerHTML = '';

    if (travelerTrips.length > 0) {
      travelerTrips.forEach(trip => {
        let destination = allDestinations.find(dest => dest.id === trip.destinationID)
        return destination;
      });
        let cardInfo = `
          <article class="trip-card">
            <div class="img-wrapper">
              <h3 class="destination-name">${destination.destination}</h3>
                <img class="trip-img" src=${destination.img} alt=${destination.alt}>
                </div>
            <p>trip date: ${trip.date}</p>
            <p>travelers: ${trip.travelers}</p>
            <p>duration: ${trip.duration}</p>
            <p>status: ${trip.status}</p>
          </article>`;
        cardContainer.insertAdjacentHTML('beforeend', cardInfo)
      } else {
        cardContainer.innerHTML = `<article class='no-trip'>You do not have any matching trips!</article>`
      }
    }


}
