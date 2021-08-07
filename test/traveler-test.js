import { expect } from 'chai';
import trips from './test-data/trips-data';
import destinations from './test-data/destination-data';
import travelers from './test-data/travelers-data';
import Trip from '../src/Trip.js';
import Traveler from '../src/Traveler.js';
import Destination from '../src/Destination.js';

describe('Traveler', () => {
  let traveler1, traveler2, traveler3;
  let date = '2020/10/29';

  beforeEach(() => {
    traveler1 = new Traveler(travelers[0]);
    traveler2 = new Traveler(travelers[10]);
    traveler3 = new Traveler(travelers[49]);


    // allDestinations = destinations.forEach(dest => new Destination(dest));
    // console.log('a', allDestinations);
    // allTrips = trips.forEach(trip => new Trip(trip));
    // console.log('b', allTrips);
  });

  it('should be a function', () => {
    expect(Traveler).to.be.a('function');
  });

  it('should be an instance of traveler', () => {
    expect(traveler1, traveler2, traveler3).to.be.an.instanceof(Traveler);
  });

  it('should have an id', () => {
    expect(traveler1.id).to.equal(1);
    expect(traveler2.id).to.equal(11);
    expect(traveler3.id).to.equal(50);
  });

  it('should have a name', () => {
    expect(traveler1.name).to.equal('Ham Leadbeater');
    expect(traveler2.name).to.equal('Joy Dovington');
    expect(traveler3.name).to.equal('Morey Flanders');
  });

  it('should have a traveler type', () => {
    expect(traveler1.travelerType).to.equal('relaxer');
    expect(traveler2.travelerType).to.equal('history buff');
    expect(traveler3.travelerType).to.equal('foodie');
  });

  it('should have a username for logging in', () => {
    expect(traveler1.username).to.equal('customer1');
    expect(traveler2.username).to.equal('customer11');
    expect(traveler3.username).to.equal('customer50');
  });

  it('should have a place to store trips', () => {
    expect(traveler1.trips).to.deep.equal([]);
    expect(traveler2.trips).to.deep.equal([]);
    expect(traveler3.trips).to.deep.equal([]);
  });

  it('should store amount of money spent', () => {
    expect(traveler1.amountSpent).to.equal(0);
    expect(traveler2.amountSpent).to.equal(0);
    expect(traveler3.amountSpent).to.equal(0);
  });

  it('should be able to populate trips for a traveler', () => {
    traveler1.findTrips(trips, destinations)
    expect(traveler1.trips).to.be.an('array')
    expect(traveler1.trips).to.deep.equal([{
      'id': 117,
      'userID': 1,
      'destinationID': 28,
      'travelers': 3,
      'date': '2021/01/09',
      'duration': 15,
      'status': 'approved',
      'suggestedActivities': [],
      'startDateTimeStamp': 1610175600000,
      'endDateTimeStamp': 1611471600000,
      'tripCost': 4125
    }]);
    traveler3.findTrips(trips, destinations)
    expect(traveler3.trips[0]).to.be.an('object');
    expect(traveler3.trips[0]).to.deep.equal({
      'id': 15,
      'userID': 50,
      'destinationID': 13,
      'travelers': 3,
      'date': '2020/07/04',
      'duration': 6,
      'status': 'approved',
      'suggestedActivities': [],
      'startDateTimeStamp': 1593842400000,
      'endDateTimeStamp': 1594360800000,
      'tripCost': 4290
    });
  });

  it('should have a way to sort trips by date', () => {
    traveler2.findTrips(trips, destinations)
    traveler2.sortTrips()
    expect(traveler2.trips).to.deep.equal([{
      'id': 42,
      'userID': 11,
      'destinationID': 32,
      'travelers': 1,
      'date': '2020/08/08',
      'duration': 14,
      'status': 'approved',
      'suggestedActivities': [],
      'startDateTimeStamp': 1596866400000,
      'endDateTimeStamp': 1598076000000,
      'tripCost': 2013
    }, {
      'id': 150,
      'userID': 11,
      'destinationID': 20,
      'travelers': 5,
      'date': '2020/10/29',
      'duration': 8,
      'status': 'approved',
      'suggestedActivities': [],
      'startDateTimeStamp': 1603951200000,
      'endDateTimeStamp': 1604646000000,
      'tripCost': 2902
    }, {
      'id': 31,
      'userID': 11,
      'destinationID': 33,
      'travelers': 3,
      'date': '2020/12/19',
      'duration': 15,
      'status': 'approved',
      'suggestedActivities': [],
      'startDateTimeStamp': 1608361200000,
      'endDateTimeStamp': 1609657200000,
      'tripCost': 16863
    }]);
  });

  it('should be able to find previous trips', () => {
    traveler2.findTrips(trips, destinations);
    const previousTrips = traveler2.findPastTrips(date)
    expect(previousTrips).to.deep.equal([{
      'id': 42,
      'userID': 11,
      'destinationID': 32,
      'travelers': 1,
      'date': '2020/08/08',
      'duration': 14,
      'status': 'approved',
      'suggestedActivities': [],
      'startDateTimeStamp': 1596866400000,
      'endDateTimeStamp': 1598076000000,
      'tripCost': 2013
    }]);
    
    date = '2020/12/19';
    const previousTrips2 = traveler2.findPastTrips(date);
    expect(previousTrips2.length).to.equal(2);
    expect(previousTrips2).to.deep.equal([{
      'id': 42,
      'userID': 11,
      'destinationID': 32,
      'travelers': 1,
      'date': '2020/08/08',
      'duration': 14,
      'status': 'approved',
      'suggestedActivities': [],
      'startDateTimeStamp': 1596866400000,
      'endDateTimeStamp': 1598076000000,
      'tripCost': 2013
    }, {
      'id': 150,
      'userID': 11,
      'destinationID': 20,
      'travelers': 5,
      'date': '2020/10/29',
      'duration': 8,
      'status': 'approved',
      'suggestedActivities': [],
      'startDateTimeStamp': 1603951200000,
      'endDateTimeStamp': 1604646000000,
      'tripCost': 2902
    }]);
  });


});
