const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticket.controller');

router.get('/tickets', ticketController.getTickets);
router.get('/tickets/:id', ticketController.getTicketById);
router.post('/tickets', ticketController.createTicket);
router.put('/tickets/:id', ticketController.updateTicket);
router.delete('/tickets/:id', ticketController.deleteTicket);

module.exports = router;