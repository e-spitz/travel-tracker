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
    const pastTrips = this.trips.filter(trip => trip.endDateTimeStamp < todayTimeStamp);
    if (!pastTrips.length) {
      return 'You haven\'t been travelin\' much...';
    }
      return pastTrips;
  }

  findPresentTrips(todayDate) {
    const todayTimeStamp = new Date(todayDate).getTime();
    const presentTrips = this.trips.filter(trip => trip.startDateTimeStamp <= todayTimeStamp && trip.endDateTimeStamp >= todayTimeStamp)
    if (!presentTrips.length) {
      return 'You are not currently on a trip. Bummer!';
    }
      return presentTrips;
  }

  findUpcomingTrips(todayDate) {
    const todayTimeStamp = new Date(todayDate).getTime();
    const upcomingTrips = this.trips.filter(trip => trip.startDateTimeStamp > todayTimeStamp)
    if (!upcomingTrips.length) {
      return 'You have no future trips scheduled. Time for a vacation!';
    }
      return upcomingTrips;
  }

  findPendingTrips() {
    const pendingTrips = this.trips.filter(trip => trip.status === 'pending');
    if (!pendingTrips.length) {
      return 'You have no trips to be approved at this time.';
    }
    return pendingTrips;
  }


//calculate total amount spent


}

export default Traveler;
