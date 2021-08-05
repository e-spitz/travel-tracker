class Destination {
  constructor(singleDest) {
    this.id = singleDest.id;
    this.destination = singleDest.destination;
    this.estimatedLodgingCostPerDay = singleDest.estimatedLodgingCostPerDay;
    this.estimatedFlightCostPerPerson = singleDest.estimatedFlightCostPerPerson;
    this.image = singleDest.image;
    this.alt = singleDest.alt; 
  }
}

export default Destination;
