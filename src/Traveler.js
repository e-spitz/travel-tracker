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
    this.trips.forEach(trip => trip.getTripTimeStamps());
    this.trips.forEach(trip => trip.calculateTripCost(destinationsData));
    this.sortTrips();
}

//need to sort trips based of time stamps in order to determine past/present/etc

  sortTrips() {
    this.trips.sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });
  }

  findPastTrips(todayDate) {
    const todayTimeStamp = new Date(todayDate).getTime();
    return this.trips.filter(trip => trip.endDateTimeStamp < todayTimeStamp)
  }

  findPresentTrips(todayDate) {
    const todayTimeStamp = new Date(todayDate).getTime();
    const presentTrips = this.trips.filter(trip => trip.startDateTimeStamp <= todayTimeStamp && trip.endDateTimeStamp >= todayTimeStamp)
    if (!presentTrips.length) {
      return 'You have no present trips scheduled at this time.'
    }
      return presentTrips;
  }



//present trips


//upcoming trips


//pending trips


//calculate total amount spent


}

export default Traveler;
