const users = require('../data/users.json');

exports.getUsers = (req, res) => res.json(users);
exports.getUserById = (req, res) => {
  const user = users.find(
    (u) => String(u.id) === String(req.params.id)
  );

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'Not found' });
  }
};

exports.createUser = (req, res) => res.json(req.body);
exports.updateUser = (req, res) => res.json(req.body);
exports.deleteUser = (req, res) => res.json({ message: 'User deleted' });
