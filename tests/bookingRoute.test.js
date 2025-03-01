const request = require('supertest');
const app = require('../app');

// Mock the Booking model
jest.mock('../models/booking', () => {
  return {
    create: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    deleteMany: jest.fn(),
  };
});

const Booking = require('../models/booking');

describe('Booking API Endpoints', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const sampleBooking = {
    _id: '507f1f77bcf86cd799439011',
    name: 'John Doe',
    email: 'john@example.com',
    people: 4,
    pickUpTime: '10:00 AM',
    Location: 'Downtown',
    phoneNumber: '1234567890'
  };

  it('should create a booking', async () => {
    Booking.create.mockResolvedValue(sampleBooking);

    const res = await request(app)
      .post('/api/bookings/create')
      .send(sampleBooking);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('_id');
  });

  it('should get all bookings', async () => {
    Booking.find.mockResolvedValue([sampleBooking]);

    const res = await request(app).get('/api/bookings/all');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should get a single booking', async () => {
    Booking.findById.mockResolvedValue(sampleBooking);

    const res = await request(app)
      .get(`/api/bookings/${sampleBooking._id}`);
    expect(res.status).toBe(200);
    expect(res.body._id).toBe(sampleBooking._id);
  });

  it('should handle invalid booking data', async () => {
    const res = await request(app)
      .post('/api/bookings/create')
      .send({});

    expect(res.status).toBe(400);
  });
});
