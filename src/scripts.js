import './css/base.scss';
// import './css/styles.scss';
import { fetchAll } from './apiCalls';
import { domUpdates } from './domUpdates';
import Trip from './Trip';
import Traveler from './Traveler';
import Destination from './Destination';


let traveler, travelers; // don't know if we need this
let allDestinations, allTrips;
let date = new Date();
let fetchSingleTravelerData, fetchTravelersData, fetchTripsData, fetchDestinationsData;

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
    console.log(fetchSingleTravelerData);

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
  displayTraveler();
}

const displayTraveler = () => {
  domUpdates.displayTravelerName(traveler)
  domUpdates.displayYearlyTotal(traveler.amountSpent)
}



// const displayCost = (total) => {
//   const totalSpent = document.getElementById('totalSpent');
//   totalSpent.innerText = `${total}`;
// }
