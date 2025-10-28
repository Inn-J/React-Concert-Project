const express = require('express');
const cors = require('cors');

const app = express();

const port = process.env.PORT || 4000;
const productRoutes = require('./routes/product.routes.js');
const userRoutes = require('./routes/user.routes.js');
const ticketRoutes = require('./routes/booking.routes.js');
app.use(cors());
app.use(express.json());

app.use("/", productRoutes);
app.use("/", userRoutes);
app.use("/", ticketRoutes);


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
