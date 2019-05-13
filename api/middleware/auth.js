const bcrypt = require("bcryptjs");

const db = require("../users/users-model");

function required(req, res, next) {
  const { username, password } = req.headers;

  if (username && password) {
    db.findBy({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          next();
        } else {
          res.status(401).json({ message: "Invalid username or password." });
        }
      })
      .catch(error => {
        res.status(500).json(error);
      });
  } else {
    res.status(400).json({ message: "Please provide username or password" });
  }
}

module.exports = required;