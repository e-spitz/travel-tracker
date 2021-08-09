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

  sortTrips() {
    this.trips.sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });
  }

  findTrips(tripsData, destinationsData) {
    tripsData.forEach(trip => {
      if (trip.userID === this.id) {
        this.trips.push(new Trip(trip));
      }
    })
    this.trips.forEach(trip => trip.getTripTimeStamps());
    this.trips.forEach(trip => trip.calculateTripCost(destinationsData));
    this.sortTrips();
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
    const presentTrips = this.trips.filter(trip => trip.startDateTimeStamp <= todayTimeStamp && trip.endDateTimeStamp >= todayTimeStamp);
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

  calculateTotalAmountSpent(todayDate, destinationsData) {
    const currentYear = todayDate.toString().split(' ')[3];
    this.amountSpent = this.trips.reduce((sum, trip) => {
      let tripYear = trip.date.split('/')[0];
      if (tripYear === currentYear) {
        sum += trip.calculateTripCost(destinationsData);
      }
      return sum;
    }, 0)
    // if (!this.amountSpent) {
    //   return 'Doh! It looks like you didn\'t travel this year.';
    // }
  }

}

export default Traveler;
