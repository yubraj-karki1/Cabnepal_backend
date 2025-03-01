const bookingController = require('../controllers/bookingController');
const Booking = require('../model/Booking');

// Mock Sequelize Methods
jest.mock('../model/Booking', () => ({
  create: jest.fn(),
  findAll: jest.fn(),
}));

describe('Booking Controller', () => {
  const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  it('should create a new booking', async () => {
    const req = { body: { name: 'John Doe', email: 'john@example.com', people: 4, pickUpTime: '10:00 AM', Location: 'Downtown', phoneNumber: '1234567890' } };
    const res = mockResponse();
    Booking.create.mockResolvedValue({ id: 1, ...req.body });

    await bookingController.createBooking(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: "Booking created successfully", bookingId: 1 }));
  });

  it('should return all bookings', async () => {
    const req = {};
    const res = mockResponse();
    Booking.findAll.mockResolvedValue([{ id: 1, name: 'John Doe', email: 'john@example.com' }]);

    await bookingController.getBookings(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.arrayContaining([{ id: 1, name: 'John Doe', email: 'john@example.com' }]));
  });
});
