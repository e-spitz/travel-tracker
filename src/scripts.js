import './css/base.scss';
// import './css/styles.scss';
import { fetchAll } from './apiCalls';
import { domUpdates } from './domUpdates';
import Trip from './Trip';
import Traveler from './Traveler';
import Destination from './Destination';

let greetingMsg = document.getElementById('greetingMsg')

let traveler, travelers; // don't know if we need this
let allDestinations, allTrips;
let date = Date.now()
// console.log(date);
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
    // console.log(fetchSingleTravelerData);

    traveler = fetchSingleTravelerData;
    travelers = fetchTravelersData.map(trav => new Traveler(trav));
    allTrips = fetchTripsData.map(trip => new Trip(trip));
    allDestinations = fetchDestinationsData.map(dest => new Destination(dest));
    // console.log(traveler, travelers, allTrips, allDestinations);
  })
  .then(data => domUpdates.displayTravelerName(traveler))
  .catch(err => displayError(err))
})
