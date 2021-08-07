import Trip from './Trip.js'

class Traveler {
  constructor(singleTraveler) {
    this.id = singleTraveler.id;
    this.name = singleTraveler.name;
    this.travelerType = singleTraveler.travelerType;
    this.username = `customer${singleTraveler.id}`;
    this.trips = [];
    this.amountSpent = 0;
  }

  //find all trip.userIDs that match traveler.id and push in to this.trips []
  findTrips(tripsData, destinationsData) {
    tripsData.forEach(trip => {
      if (trip.userID === this.id) {
        this.trips.push(new Trip(trip))
      }
    })
    this.trips.forEach(trip => trip.getTripTimeStamps())
    this.trips.forEach(trip => trip.calculateTripCost(destinationsData))
}

//past trips


//present trips


//upcoming trips


//pending trips
}

export default Traveler;
