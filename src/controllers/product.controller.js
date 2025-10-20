const products = require('../data/products.json');

exports.getProducts = (req, res) => res.json(products);
exports.getConcertById = (req, res) => {
  const concert = products.find(
    (c) => String(c.id) === String(req.params.id)
  );

  if (concert) {
    res.json(concert);
  } else {
    res.status(404).json({ message: 'Not found' });
  }
};