const router = require("express").Router();
const db = require('./users-model');
const bcrypt = require('bcryptjs');
const restricted = require('../middleware/auth');

//=======================================================Create Reducer
//------------------------------------------ New User
router.post("/register", (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 8);
    user.password = hash;
  
    db.add(user)
      .then(saved => {
        res.status(201).json(saved);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });

//=======================================================Read Reducer
router.get("/", restricted, (req, res) => {
    db.find()
      .then(users => {
        res.json(users);
      })
      .catch(err => res.send(err));
  });

//======================================================= Update Reducer
//======================================================= Delete Reducer
//======================================================= Login Reducer
router.post("/login", (req, res) => {
    let { username, password } = req.body;
  
    db.findBy({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          res.status(200).json({ message: `Welcome ${user.username}` });
        } else {
          res.status(401).json({ message: `Invalid username or password.` });
        }
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });

module.exports = router;