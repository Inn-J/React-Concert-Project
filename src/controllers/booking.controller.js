const path = require("path");
const fs = require("fs/promises");
const bookingDataPath = path.join(__dirname, "..", "data", "bookings.json");

async function readBookingData() {
  const buf = await fs.readFile(bookingDataPath, "utf8");
  return JSON.parse(buf || "[]");
}

async function writeBookingData(data) {
  await fs.writeFile(bookingDataPath, JSON.stringify(data, null, 2), "utf8");
}

exports.getBookings = async (req, res) => {
  const tickets = await readBookingData();
  res.json(tickets);
};

exports.getBookingById = async (req, res) => {
  const tickets = await readBookingData();
  const ticket = tickets.find((t) => String(t.id) === String(req.params.id));
  if (!ticket) return res.status(404).json({ message: "Not found" });
  res.json(ticket);
};

exports.getBookingsByUser = async (req, res) => {
  const tickets = await readBookingData();
  const userTickets = tickets.filter((t) => String(t.userId) === String(req.params.userId));

  if (userTickets.length === 0)
    return res.status(404).json({ message: "No bookings found for this user" });

  res.json(userTickets);
};

exports.createBooking = async (req, res) => {
  const tickets = await readBookingData();
  const ids = tickets.map((t) => Number(t.id)).filter(Number.isFinite);
  const nextId = ids.length ? Math.max(...ids) + 1 : 1;
  const newItem = { bookingId: nextId, ...req.body };
  tickets.push(newItem);
  await writeBookingData(tickets);
  res.status(201).json(newItem);
};

exports.updateBooking = async (req, res) => {
  const tickets = await readBookingData();
  const idx = tickets.findIndex((t) => String(t.id) === String(req.params.id));
  if (idx === -1) return res.status(404).json({ message: "Not found" });
  tickets[idx] = { ...tickets[idx], ...req.body, id: tickets[idx].id };
  await writeBookingData(tickets);

  res.json(tickets[idx]);
};

exports.deleteBooking = async (req, res) => {
  const tickets = await readBookingData();
  const idx = tickets.findIndex((t) => String(t.id) === String(req.params.id));
  if (idx === -1) return res.status(404).json({ message: "Not found" });

  const [removed] = tickets.splice(idx, 1);
  await writeBookingData(tickets);

  res.json({ success: true, removed });
};
