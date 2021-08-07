import { expect } from 'chai';
import trips from './test-data/trips-data';
import destinations from './test-data/destination-data';
import Trip from '../src/Trip.js';

describe('Trip', () => {
  let trip1, trip2, trip3;

  beforeEach(() => {
    trip1 = new Trip(trips[0])
    trip2 = new Trip(trips[5])
    trip3 = new Trip(trips[10])
  })

  it('should be a function', () => {
    expect(Trip).to.be.a('function');
  });

  it('should be an instance of Trip', () => {
    expect(trip1).to.be.an.instanceof(Trip);
    expect(trip2).to.be.an.instanceof(Trip);
    expect(trip3).to.be.an.instanceof(Trip);
  });

  it('should have an id', () => {
    expect(trip1.id).to.equal(1);
    expect(trip2.id).to.equal(6);
    expect(trip3.id).to.equal(11);
  });

  it('should have a user ID', () => {
    expect(trip1.userID).to.equal(44);
    expect(trip2.userID).to.equal(29);
    expect(trip3.userID).to.equal(50);
  });

  it('should have a destination ID', () => {
    expect(trip1.destinationID).to.equal(49);
    expect(trip2.destinationID).to.equal(35);
    expect(trip3.destinationID).to.equal(5);
  });

  it('should have a total number of travelers', () => {
    expect(trip1.travelers).to.equal(1);
    expect(trip2.travelers).to.equal(3);
    expect(trip3.travelers).to.equal(4);
  });

  it('should have a start date', () => {
    expect(trip1.date).to.equal('2019/09/16');
    expect(trip2.date).to.equal('2020/06/29');
    expect(trip3.date).to.equal('2020/10/14');
  });

  it('should have a trip duration', () => {
    expect(trip1.duration).to.equal(8);
    expect(trip2.duration).to.equal(9);
    expect(trip3.duration).to.equal(4);
  });

  it('should have a status of pending or approved', () => {
    expect(trip1.status).to.equal('pending');
    expect(trip2.status).to.equal('approved');
    expect(trip3.status).to.equal('approved');
  });

  it('should have a place to store suggested activities', () => {
    expect(trip1.suggestedActivities).to.deep.equal([]);
    expect(trip2.suggestedActivities).to.deep.equal([]);
    expect(trip3.suggestedActivities).to.deep.equal([]);
  });

  it('should be able to find a start date time stamp', () => {
    trip1.getTripTimeStamps();
    expect(trip1.startDateTimeStamp).to.be.a('number');
    expect(trip1.startDateTimeStamp).to.equal(1568613600000);
    trip2.getTripTimeStamps();
    expect(trip2.startDateTimeStamp).to.equal(1593410400000);
  });

  it('should be able to find an end date time stamp', () => {
    trip3.getTripTimeStamps();
    expect(trip3.endDateTimeStamp).to.equal(1603000800000);
  });

  it('should be able to calculate the cost of a trip including the travel agent\'s fee', () => {
    trip1.calculateTripCost(destinations);
    expect(trip1.tripCost).to.equal(5819);
    trip2.calculateTripCost(destinations);
    expect(trip2.tripCost).to.equal(2310);
    trip3.calculateTripCost(destinations);
    expect(trip3.tripCost).to.equal(3520);
    expect(trip1.tripCost, trip2.tripCost, trip3.tripCost).to.be.a('number');
  });

  it('should be able to calculate total cost of a trip per person', () => {
    const total = trip1.calculateTripCost(destinations);
    const perPerson = trip1.calculateCostPerPersonPerTrip(total);
    expect(perPerson).to.equal(5819);
    const total2 = trip2.calculateTripCost(destinations);
    const perPerson2 = trip2.calculateCostPerPersonPerTrip(total2);
    expect(perPerson2).to.equal(770);
    const total3 = trip3.calculateTripCost(destinations);
    const perPerson3 = trip3.calculateCostPerPersonPerTrip(total3);
    expect(perPerson3).to.equal(880);
  });
});
