const express = require('express');
const app = express();

const port = process.env.PORT || 4000;
const productRoutes = require('./routes/product.routes.js');

app.use("/",productRoutes);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});