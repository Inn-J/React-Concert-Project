const tickets = require('../data/ticketdata.json');

exports.getTickets = (req, res) => res.json(tickets);
exports.getTicketById = (req, res) => {
  const ticket = tickets.find(
    (t) => String(t.id) === String(req.params.id)
  );

  if (ticket) {
    res.json(ticket);
  } else {
    res.status(404).json({ message: 'Not found' });
  }
};
exports.createTicket = (req, res) => res.json(req.body);
exports.updateTicket = (req, res) => res.json(req.body);
exports.deleteTicket = (req, res) => res.json({ message: 'Ticket deleted' });

