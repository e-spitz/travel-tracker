import './css/base.scss';
// import './css/styles.scss';
import { fetchAPIData } from './apiCalls';
import Trip from './Trip';
import Traveler from './Traveler';
import Destination from './Destination';

let traveler;
let allDestinations;
let allTrips;
let date;

window.addEventListener('load', () => {
  start();
});

const start = () => {
  setUpTrips();
}

const setUpTrips = () => {
  fetchAPIData('trips')
  .then(data => allTrips = data.trips)
}

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'

console.log('This is the JavaScript entry file - your code begins here.');
