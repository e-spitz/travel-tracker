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
            <p>trip date: ${updateDate}</p>
            <p>travelers: ${trip.travelers}</p>
            <p>duration: ${trip.duration}</p>
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
      <option value='${d.id}' required>${d.destination}</option>`
      destList.insertAdjacentHTML('beforeend', destSelect)
    });
  },

 //  loadFormValues(){
 //    const destination = document.getElementById('destinationChoices').value; //sting of location
 //    const date = document.getElementById('departureDateInput').value; //date logs as 2021-08-18
 //    const tripLength = document.getElementById('durationInput').value; //number
 //    const numOfTravelers = document.getElementById('travelersInput').value; //number
 //    const newBookingObj = {
 //      location: destination,
 //      departureDate: date,
 //      tripDuration: tripLength,
 //      travelersCount: numOfTravelers
 //    }
 //    console.log(newBookingObj);
 //    return newBookingObj;
 // },

  toggleView(element) {
    element.classList.toggle('hidden')
  }

}
