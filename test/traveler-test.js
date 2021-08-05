import { expect } from 'chai';
import trips from './test-data/trips-data';
import destinations from './test-data/destination-data';
import travelers from './test-data/travelers-data';
import Trip from '../src/Trip.js';
import Traveler from '../src/Traveler.js';
import Destination from '../src/Destination.js';

describe('Traveler', () => {
  let traveler1, traveler2, traveler3;
  let date = '2020/01/09';
  let allDestinations;

  beforeEach(() => {
    traveler1 = new Traveler(travelers[0]);
    // {
    //     "id": 1,
    //     "name": "Ham Leadbeater",
    //     "travelerType": "relaxer"
    // }
    traveler2 = new Traveler(travelers[10]);
    // {
    //     "id": 11,
    //     "name": "Joy Dovington",
    //     "travelerType": "history buff"
    // }
    traveler3 = new Traveler(travelers[49]);
    // {
    //     "id": 50,
    //     "name": "Morey Flanders",
    //     "travelerType": "foodie"
    // }
    allDestinations = destinations.forEach(dest => new Destination(dest));
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
});
