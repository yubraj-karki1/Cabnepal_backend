const Booking = require('../model/Booking');

// Create a new booking
const createBooking = async (req, res) => {
    const { name, email, people, pickUpTime, Location, phoneNumber } = req.body;

    try {
        const newBooking = await Booking.create({ name, email, people, pickUpTime, Location, phoneNumber });
        res.status(201).json({ message: "Booking created successfully", bookingId: newBooking.id });
    } catch (error) {
        console.error("Error creating booking:", error);
        res.status(500).json({ error: "Failed to create booking" });
    }
};

// Get all bookings
const getBookings = async (req, res) => {
    try {
        const bookings = await Booking.findAll();
        res.status(200).json(bookings);
    } catch (error) {
        console.error("Error fetching bookings:", error);
        res.status(500).json({ error: "Failed to fetch bookings" });
    }
};

module.exports = { createBooking, getBookings };
