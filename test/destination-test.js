import { expect } from 'chai';
import destinations from './test-data/destination-data';
import Destination from '../src/Destination.js';

describe('Destination', () => {
  let destination1, destination2, destination3;

  beforeEach(() => {
    destination1 = new Destination(destinations[0]);
    // {
    //   "id": 1,
    //   "destination": "Lima, Peru",
    //   "estimatedLodgingCostPerDay": 70,
    //   "estimatedFlightCostPerPerson": 400,
    //   "image": "https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80",
    //   "alt": "overview of city buildings with a clear sky"
    // }
    destination2 = new Destination(destinations[10]);
    // {
    //   "id": 11,
    //   "destination": "Mikonos, Greece",
    //   "estimatedLodgingCostPerDay": 140,
    //   "estimatedFlightCostPerPerson": 1000,
    //   "image": "https://images.unsplash.com/photo-1573783309724-e44b859f5a85?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1953&q=80",
    //   "alt": "cityscape along the water during the day"
    // }
    destination3 = new Destination(destinations[49]);
    // {
    //   "id": 50,
    //   "destination": "Hobart, Tasmania",
    //   "estimatedLodgingCostPerDay": 1400,
    //   "estimatedFlightCostPerPerson": 75,
    //   "image": "https://images.unsplash.com/photo-1506982724953-b1fbe939e1e3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
    //   "alt": "person sitting on brown rock in front of small body of water"
    // }
  });

  it('should be a function', () => {
    expect(Destination).to.be.a('function');
  });

  it('should be an instance of destination', () => {
    expect(destination1).to.be.an.instanceof(Destination);
    expect(destination2).to.be.an.instanceof(Destination);
    expect(destination3).to.be.an.instanceof(Destination);
  });

  it('should have an id', () => {
    expect(destination1.id).to.equal(1);
    expect(destination2.id).to.equal(11);
    expect(destination3.id).to.equal(50);
  });

  it('should have a destination location', () => {
    expect(destination1.destination).to.equal('Lima, Peru');
    expect(destination2.destination).to.equal('Mikonos, Greece');
    expect(destination3.destination).to.equal('Hobart, Tasmania');

  });

  it('should have an estimated lodging cost per day', () => {
    expect(destination1.estimatedLodgingCostPerDay).to.equal(70);
    expect(destination2.estimatedLodgingCostPerDay).to.equal(140);
    expect(destination3.estimatedLodgingCostPerDay).to.equal(1400);
    expect(destination1.estimatedLodgingCostPerDay).to.be.a('number');
  });

  it('should have an estimated flight cost per person', () => {
    expect(destination1.estimatedFlightCostPerPerson).to.equal(400);
    expect(destination2.estimatedFlightCostPerPerson).to.equal(1000);
    expect(destination3.estimatedFlightCostPerPerson).to.equal(75);
    expect(destination1.estimatedFlightCostPerPerson).to.be.a('number');
  });

  it('should have an image url', () => {
    expect(destination1.image).to.equal('https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80');
    expect(destination2.image).to.equal('https://images.unsplash.com/photo-1573783309724-e44b859f5a85?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1953&q=80');
    expect(destination3.image).to.equal('https://images.unsplash.com/photo-1506982724953-b1fbe939e1e3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80');
  });

  it('should have an alt text for the image', () => {
    expect(destination1.alt).to.equal('overview of city buildings with a clear sky');
    expect(destination2.alt).to.equal('cityscape along the water during the day');
    expect(destination3.alt).to.equal('person sitting on brown rock in front of small body of water');
  });
});
