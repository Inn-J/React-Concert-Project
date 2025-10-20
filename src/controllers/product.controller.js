const products = require('../data/products.json');

exports.getProducts = (req, res) => res.json(products);