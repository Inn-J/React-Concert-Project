const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/booking.controller');


router.get('/bookings', ticketController.getBookings);
router.get('/bookings/:id', ticketController.getBookingById);
router.post('/bookings', ticketController.createBooking);
router.put('/bookings/:id', ticketController.updateBooking);
router.delete('/bookings/:id', ticketController.deleteBooking);

module.exports = router;