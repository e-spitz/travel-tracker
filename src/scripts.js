import './css/base.scss';
// import './css/styles.scss';
import { fetchAPIData } from './apiCalls';
import Trip from './Trip';
import Traveler from './Traveler';
import Destination from './Destination';

let traveler;
let travelers;
let allDestinations;
let allTrips;
let date;

window.addEventListener('load', () => {
  start();
});

const start = () => {
  setUpTrips();
  setUpDestinations();
  setUpTraveler();
}

const setUpTrips = () => {
  fetchAPIData('trips')
  .then(data => allTrips = data.trips)
  .then(data => console.log('allTrips', allTrips)) // single traveler trips instantiated in Traveler class
}

const setUpDestinations = () => {
  fetchAPIData('destinations')
  .then(data => allDestinations = data.destinations)
  .then(data => console.log('allDestinations', allDestinations)) //don't think we need to instantiate here bc all properties are accessible through dot notation
}

const setUpTraveler = () => {
  fetchAPIData('travelers')
  .then(data => travelers = data.travelers.map(trav => new Traveler(trav)))
  .then(data => traveler = travelers[Math.floor(Math.random() * travelers.length)])
  .then(data => console.log('single traveler', traveler, 'allTravelers', travelers))
}

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'

console.log('This is the JavaScript entry file - your code begins here.');
