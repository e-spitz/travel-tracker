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
    this.startDateTimeStamp = 0;
    this.endDateTimeStamp = 0;
  }

  getTripTimeStamps() {
   let startTime = new Date(this.date).getTime();
   let addedTime = new Date(this.date).getDate() + this.duration;
   let endTime = new Date(this.date).setDate(addedTime);
   this.startDateTimeStamp = startTime;
   this.endDateTimeStamp = endTime;
  }

}

export default Trip;
