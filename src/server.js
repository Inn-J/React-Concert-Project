const express = require('express');
const cors = require('cors');

const app = express();

const port = process.env.PORT || 4000;
const productRoutes = require('./routes/product.routes.js');
const userRoutes = require('./routes/user.routes.js');
const bookingRoutes = require('./routes/booking.routes.js');
const adminRoutes = require('./routes/admin.routes.js');
app.use(cors());
app.use(express.json());

app.use("/", productRoutes);
app.use("/", userRoutes);
app.use("/", bookingRoutes);
app.use("/", adminRoutes);


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
