import './css/base.scss';
// import './css/styles.scss';
import { fetchAll } from './apiCalls';
import Trip from './Trip';
import Traveler from './Traveler';
import Destination from './Destination';

let traveler, travelers; // don't know if we need this
let allDestinations, allTrips;
let date = Date.now()
// console.log(date);
let fetchSingleTravelerData, fetchTravelersData, fetchTripsData, fetchDestinationsData;

window.addEventListener('load', function() {
  fetchAll()
  .then(data => {
    fetchSingleTravelerData = data[0];
    // console.log(fetchSingleTravelerData)
    fetchTravelersData = data[1].travelers;
    // console.log(fetchTravelersData);
    fetchTripsData = data[2].trips;
    // console.log(fetchTripsData);
    fetchDestinationsData = data[3].destinations;
    // console.log(fetchDestinationsData);

    traveler = fetchSingleTravelerData;
    travelers = fetchTravelersData.map(trav => new Traveler(trav));
    allTrips = fetchTripsData.map(trip => new Trip(trip));
    allDestinations = fetchDestinationsData.map(dest => new Destination(dest));
    // console.log(traveler, travelers, allTrips, allDestinations);
  })
  .catch(err => displayError(err))
})
