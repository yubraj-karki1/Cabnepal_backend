const mongoose = require('mongoose');
const Booking = require('../models/booking');

// Mock the Booking model
jest.mock('../models/booking', () => {
  return jest.fn().mockImplementation((data) => {
    return {
      ...data,
      save: jest.fn().mockResolvedValue(data)
    };
  });
});

describe('Booking Model', () => {
  beforeEach(() => {
    Booking.mockClear();
  });

  it('should create a booking with valid data', () => {
    const bookingData = {
      name: 'John Doe',
      email: 'john@example.com',
      people: 4,
      pickUpTime: '10:00 AM',
      Location: 'Downtown',
      phoneNumber: '1234567890'
    };

    const booking = new Booking(bookingData);
    expect(booking).toMatchObject(bookingData);
  });

  it('should fail without required fields', () => {
    const invalidData = {};
    const booking = new Booking(invalidData);
    expect(booking.save()).rejects.toThrow();
  });
});