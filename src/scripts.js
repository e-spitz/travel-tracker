import './css/base.scss';
// import './css/styles.scss';
import { fetchAll, postNewTrip } from './apiCalls';
import { domUpdates } from './domUpdates';
import Trip from './Trip';
import Traveler from './Traveler';
import Destination from './Destination';

let navButtons = document.querySelectorAll('.nav-btn');
let allTripBtn = document.getElementById('allTrips');
let clickToBook = document.getElementById('clickToBook');
let bookForm = document.getElementById('bookingForm');
let loginBtn = document.getElementById('loginBtn');
let logoutBtn = document.getElementById('logoutBtn');
let loginPage = document.getElementById('loginPage');
let mainPage = document.getElementById('mainPage');
let estimatedTripCostBtn = document.getElementById('costBtn');
let closeCostModal = document.getElementById('costModal');
let bookYourTripBtn = document.getElementById('bookBtn');
let closeBookModal = document.getElementById('bookModal');

let usernameID, traveler, travelers;
let allDestinations, allTrips;
let date = new Date();
let fetchSingleTravelerData, fetchTravelersData, fetchTripsData, fetchDestinationsData;

navButtons.forEach(button => button.addEventListener('click', renderCards))
clickToBook.addEventListener('click', showBookingForm)
logoutBtn.addEventListener('click', logInLogOut)
loginBtn.addEventListener('click', function() {
  validateLogin(event);
})
estimatedTripCostBtn.addEventListener('click', function() {
  showTripCosts(event)
});
closeCostModal.addEventListener('click', function() {
  closeModalWindow(event)
});
bookYourTripBtn.addEventListener('click', function() {
  bookNewTrip(event);
});
closeBookModal.addEventListener('click', function() {
  closeBookWindow(event)
})

function validateLogin(event) {
  event.preventDefault();
  const usernameInput = document.getElementById('username').value;
  const travelerID = usernameInput.split('traveler')[1]
  const passwordInput = document.getElementById('password').value;
  const loginInputs = document.getElementById('loginInputs')

  if (usernameInput !== '' && passwordInput !== ''
  && usernameInput.includes('traveler') && passwordInput === 'travel2020'
  && travelerID > 0 && travelerID < 51 && travelerID.length <= 2) {
    logInLogOut();
    getAllData(travelerID);
  } else {
    const loginErrMsg = document.getElementById('loginError');
    domUpdates.toggleView(loginErrMsg);
    setTimeout(() => {
      domUpdates.toggleView(loginErrMsg);
    }, 3000)
  }
  loginInputs.reset()
}

const getAllData = (userID) => {
  fetchAll(userID)
    .then(data => {
      fetchTravelersData = data[0].travelers;
      fetchTripsData = data[1].trips;
      fetchDestinationsData = data[2].destinations;
      fetchSingleTravelerData = data[3];
      traveler = new Traveler(fetchSingleTravelerData)
      travelers = fetchTravelersData.map(trav => new Traveler(trav));
      allTrips = fetchTripsData.map(trip => new Trip(trip));
      allDestinations = fetchDestinationsData.map(dest => new Destination(dest));
      renderTraveler()
    })
    .catch(err => displayError(err))
}

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

function loadFormValues(){
  const destinationID = document.getElementById('destinationChoices').value;
  const departureDate = document.getElementById('departureDateInput').value;
  const changeDate = departureDate.split('-');
  const fixedDate = changeDate.join('/');
  const tripLength = document.getElementById('durationInput').value;
  const numOfTravelers = document.getElementById('travelersInput').value;

  let postTripObject = {
    "id": allTrips.length + 1,
    "userID": traveler.id,
    "destinationID": parseInt(destinationID),
    "travelers": parseInt(numOfTravelers),
    "date": fixedDate,
    "duration": parseInt(tripLength),
    "status": "pending",
    "suggestedActivities": []
  }
  return postTripObject;
}

function checkFormFields(newTrip) {
  const departureDate = document.getElementById('departureDateInput').value;
  const changeDate = departureDate.split('-');
  const fixedDate = changeDate.join('/');
  const checkDate = new Date(fixedDate).getTime();

  let filledOut = true;
  if (!newTrip.destinationID || !newTrip.date || !newTrip.duration || !newTrip.travelers || checkDate < date) {
    filledOut = false;
  }
  return filledOut;
}

function showTripCosts(event) {
  event.preventDefault()
  const formTripData = loadFormValues();
  const newTrip = new Trip(formTripData)
  const formFields = checkFormFields(newTrip);
  if (!formFields) {
    alert('Please check to make sure all fields are filled out and departure date is today or later.')
  } else {
    const tripCost = newTrip.calculateTripCost(allDestinations)
    const perPerson = newTrip.calculateCostPerPersonPerTrip(tripCost)
    domUpdates.displayTripCostsModal(tripCost, perPerson)
  }
}

function closeModalWindow(event) {
  if (event.target.id === 'closeModal') {
    domUpdates.hideModal()
  }
}

function bookNewTrip(event) {
  event.preventDefault()
  const postTripObj = loadFormValues();
  const newTrip = new Trip(postTripObj)
  const formFields = checkFormFields(newTrip);

  if (!formFields) {
    alert('Please check to make sure all fields are filled out and departure date is today or later.')
  } else {
    postNewTrip(newTrip)
    .then(response => {
      console.log(response.message);
      if (response.message !== '404 error') {
        getAllData(traveler.id);
        domUpdates.displayBookingModal(newTrip, allDestinations);
      } else {
        domUpdates.displayPostErrorModal();
      }
    })
  }
}

function closeBookWindow(event) {
  if (event.target.id === 'bookCloseModal') {
    domUpdates.hideBookingModal()
  }
}
