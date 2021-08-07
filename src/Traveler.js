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
  findTrips(tripsData) {
    tripsData.forEach(trip => {
      if (trip.userID === this.id) {
        this.trips.push(new Trip(trip))
      }
    })
}
}

export default Traveler;
