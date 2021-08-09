import './css/base.scss';
// import './css/styles.scss';
import { fetchAll } from './apiCalls';
import { domUpdates } from './domUpdates';
import Trip from './Trip';
import Traveler from './Traveler';
import Destination from './Destination';

let navButtons = document.querySelectorAll('.nav-btn')
let allTripBtn = document.getElementById('allTrips')

let traveler, travelers;
let allDestinations, allTrips;
let date = new Date();
let fetchSingleTravelerData, fetchTravelersData, fetchTripsData, fetchDestinationsData;

navButtons.forEach(button => button.addEventListener('click', renderCards))

window.addEventListener('load', function() {
  fetchAll()
  .then(data => {
    fetchTravelersData = data[0].travelers;
    // console.log(fetchTravelersData);
    fetchTripsData = data[1].trips;
    // console.log(fetchTripsData);
    fetchDestinationsData = data[2].destinations;
    // console.log(fetchDestinationsData);
    fetchSingleTravelerData = new Traveler(data[3]);
    // console.log(fetchSingleTravelerData);
    traveler = fetchSingleTravelerData;
    travelers = fetchTravelersData.map(trav => new Traveler(trav));
    allTrips = fetchTripsData.map(trip => new Trip(trip));
    allDestinations = fetchDestinationsData.map(dest => new Destination(dest));
    renderTraveler()
  })
  .catch(err => displayError(err))
})

const renderTraveler = () => {
  traveler.findTrips(allTrips, allDestinations);
  traveler.calculateTotalAmountSpent(date, allDestinations);
  displayTravelerInfo();
}

const displayTravelerInfo = () => {
  domUpdates.displayTravelerName(traveler);
  domUpdates.displayYearlyTotal(traveler.amountSpent);
  //domUpdates.displayTripCards();
}

function renderCards(event) {
  let btnID = event.target.id;
  let showTrips;
  if (btnID === 'all') {
    showTrips = traveler.trips;
  }
  if (btnID === 'past') {
    showTrips = traveler.findPastTrips(date);
  }
  if (btnID === 'present') {
    showTrips = traveler.findPresentTrips(date);
  }
  if (btnID === 'future') {
    showTrips = traveler.findUpcomingTrips(date);
  }
  if (btnID === 'pending') {
    showTrips = traveler.findPendingTrips();
  }
  // domUpdates.displayTripCards(showTrips)
}
