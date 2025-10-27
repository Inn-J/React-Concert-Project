const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path'); 
const app = express();

const port = process.env.PORT || 4000;
const productRoutes = require('./routes/product.routes.js');
const userRoutes = require('./routes/user.routes.js');
const ticketRoutes = require('./routes/ticket.routes.js');
app.use(cors());
app.use(express.json());

app.use("/", productRoutes);
app.use("/", userRoutes);
app.use("/", ticketRoutes);

const dataDir = path.join(__dirname, 'data');
const bookingsPath = path.join(__dirname, 'data', 'booking.json');

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
  console.log('Created data directory');
}

app.post('/bookings', (req, res) => {
  const newBooking = req.body;

  try {
    let bookings = [];

    // ถ้ามีไฟล์อยู่แล้ว ให้อ่านข้อมูลก่อน
    if (fs.existsSync(bookingsPath)) {
      const rawData = fs.readFileSync(bookingsPath, 'utf-8');
      bookings = JSON.parse(rawData || '[]');
    }

    // เพิ่มข้อมูลใหม่
    bookings.push(newBooking);

    // เขียนกลับลงไฟล์ (format สวยงาม)
    fs.writeFileSync(bookingsPath, JSON.stringify(bookings, null, 2));

    res.status(201).json({ message: '✅ Booking saved successfully!' });
  } catch (error) {
    console.error('❌ Error saving booking:', error);
    res.status(500).json({ message: 'Failed to save booking' });
  }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
