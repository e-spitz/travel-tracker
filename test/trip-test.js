import { expect } from 'chai';
import tripsData from './test-data/trips-data';
import Trip from '../src/Trip.js';

describe('Trip', () => {
  let trip1, trip2, trip3;

  beforeEach(() => {
    trip1 = new Trip(tripsData[0])
    trip2 = new Trip(tripsData[5])
    trip3 = new Trip(tripsData[10])
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
});
