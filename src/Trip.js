class Trip {
  constructor(singleTrip) {
    this.id = singleTrip.id;
    this.userID = singleTrip.userID;
    this.destinationID = singleTrip.destinationID;
    this.travelers = singleTrip.travelers;
    this.date = singleTrip.date;
    this.duration = singleTrip.duration;
    this.status = singleTrip.status;
    this.suggestedActivities = singleTrip.suggestedActivities;
  }
}

export default Trip;
