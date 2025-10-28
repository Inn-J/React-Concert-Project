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
  const bookings = await readBookingData();
  res.json(bookings);
};

exports.getBookingById = async (req, res) => {
  const bookings = await readBookingData();
  const booking = bookings.find((t) => String(t.id) === String(req.params.id));
  if (!booking) return res.status(404).json({ message: "Not found" });
  res.json(booking);
};

exports.getBookingsByUser = async (req, res) => {
  const bookings = await readBookingData();
  const userBookings = bookings.filter((t) => String(t.userId) === String(req.params.userId));

  if (userBookings.length === 0)
    return res.status(404).json({ message: "No bookings found for this user" });

  res.json(userBookings);
};

exports.createBooking = async (req, res) => {
  const bookings = await readBookingData();
  const ids = bookings.map((t) => Number(t.bookingId)).filter(Number.isFinite);
  const nextId = ids.length ? Math.max(...ids) + 1 : 1;
  const newItem = { bookingId: nextId, ...req.body };
  bookings.push(newItem);
  await writeBookingData(bookings);
  res.status(201).json(newItem);
};

exports.updateBooking = async (req, res) => {
  const bookings = await readBookingData();
  const idx = bookings.findIndex((t) => String(t.id) === String(req.params.id));
  if (idx === -1) return res.status(404).json({ message: "Not found" });
  bookings[idx] = { ...bookings[idx], ...req.body, id: bookings[idx].id };
  await writeBookingData(bookings);

  res.json(bookings[idx]);
};

exports.deleteBooking = async (req, res) => {
  const bookings = await readBookingData();
  const idx = bookings.findIndex((t) => String(t.id) === String(req.params.id));
  if (idx === -1) return res.status(404).json({ message: "Not found" });

  const [removed] = bookings.splice(idx, 1);
  await writeBookingData(tickets);

  res.json({ success: true, removed });
};
