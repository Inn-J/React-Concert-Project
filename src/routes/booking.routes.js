const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/booking.controller');


router.get('/bookings', bookingController.getBookings);
router.get('/bookings/:id', bookingController.getBookingById);
router.get("/bookings/user/:userId", bookingController.getBookingsByUser);
router.post('/bookings', bookingController.createBooking);
router.put('/bookings/:id', bookingController.updateBooking);
router.delete('/bookings/:id', bookingController.deleteBooking);

module.exports = router;