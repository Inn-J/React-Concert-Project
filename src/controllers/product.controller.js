const products = require('../data/products.json');
const path = require("path");
const fs = require("fs/promises");
const concertDataPath = path.join(__dirname, "..", "data", "products.json");

async function readConcertData() {
  const buf = await fs.readFile(concertDataPath, "utf8");
  return JSON.parse(buf || "[]");
}

async function writeConcertData(data) {
  await fs.writeFile(concertDataPath, JSON.stringify(data, null, 2), "utf8");
}

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

exports.createProduct = async (req, res) => {
  const products = await  readConcertData();
  const ids = products.map((p) => Number(p.id)).filter(Number.isFinite);
  const nextId = ids.length ? Math.max(...ids) + 1 : 1;
  const newItem = { id: nextId, ...req.body };
  products.push(newItem);
  await writeConcertData(products);
  res.status(201).json(newItem);
};

exports.updateProduct = async (req, res) => {
  const products = await readConcertData();
  const idx = products.findIndex((p) => String(p.id) === String(req.params.id));
  if (idx === -1) return res.status(404).json({ message: "Not found" });

  products[idx] = { ...products[idx], ...req.body, id: products[idx].id };
  await writeConcertData(products);
  res.json(products[idx]);
};

exports.deleteProduct = async (req, res) => {
  const products = await readConcertData();
  const idx = products.findIndex((p) => String(p.id) === String(req.params.id));
  if (idx === -1) return res.status(404).json({ message: "Not found" });
  const [removed] = products.splice(idx, 1);
  await writeConcertData(products);
  res.json({ success: true, removed });
};
