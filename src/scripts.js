import './css/base.scss';
// import './css/styles.scss';
import { fetchAll } from './apiCalls';
import { domUpdates } from './domUpdates';
import Trip from './Trip';
import Traveler from './Traveler';
import Destination from './Destination';

let navButtons = document.querySelectorAll('.nav-btn')
let allTripBtn = document.getElementById('allTrips')
let clickToBook = document.getElementById('clickToBook')
let bookForm = document.getElementById('bookingForm')
let loginBtn = document.getElementById('loginBtn')
let logoutBtn = document.getElementById('logoutBtn')
let loginPage = document.getElementById('loginPage')
let mainPage = document.getElementById('mainPage')
let estimatedTripCostBtn = document.getElementById('costBtn')


let traveler, travelers;
let allDestinations, allTrips;
let date = new Date();
let fetchSingleTravelerData, fetchTravelersData, fetchTripsData, fetchDestinationsData;

navButtons.forEach(button => button.addEventListener('click', renderCards))
clickToBook.addEventListener('click', showBookingForm)
logoutBtn.addEventListener('click', logInLogOut)
loginBtn.addEventListener('click', logInLogOut)
costBtn.addEventListener('click', showCost)

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
  domUpdates.displayCardSectionHeader('ALL TRIPS');
  domUpdates.displayTripCards(traveler.trips, allDestinations);
}

function renderCards(event) {
  let btnID = event.target.id;
  let trips, cardHeader;
  if (btnID === 'all') {
    cardHeader = 'ALL TRIPS';
    trips = traveler.trips;
  }
  if (btnID === 'past') {
    cardHeader = 'PAST TRIPS';
    trips = traveler.findPastTrips(date);
  }
  if (btnID === 'present') {
    cardHeader = 'PRESENT TRIPS';
    trips = traveler.findPresentTrips(date);
  }
  if (btnID === 'future') {
    cardHeader = 'FUTURE TRIPS';
    trips = traveler.findUpcomingTrips(date);
  }
  if (btnID === 'pending') {
    cardHeader = 'PENDING TRIPS'
    trips = traveler.findPendingTrips();
  }
  domUpdates.displayCardSectionHeader(cardHeader)
  domUpdates.displayTripCards(trips, allDestinations)
}

function showBookingForm() {
  domUpdates.toggleView(bookForm)
  domUpdates.loadBookingDestinations(allDestinations)
}

function logInLogOut() {
  domUpdates.toggleView(loginPage)
  domUpdates.toggleView(mainPage)
}

function showCost() {
  domUpdates.getFormValues()
}
