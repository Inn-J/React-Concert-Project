const express = require('express');
const cors = require('cors'); 
const app = express();

const port = process.env.PORT || 4000;
const productRoutes = require('./routes/product.routes.js');
app.use(cors());
app.use(express.json());

app.use("/", productRoutes);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
