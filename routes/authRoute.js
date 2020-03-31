const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = require("../models/userModel");
const { jwtSecret } = require("../config/jwtSecret");

router.post("/register", (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 13);
  user.password = hash;

  return Users.create(user)
    .then(created => {
      res.status(201).json(created);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: `Error registering: ${err}` });
    });
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  return Users.getBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        delete user.password;
        return res.status(200).json({
          message: `Welcome ${user.username}!`,
          token,
          user
        });
      }
      return res.status(401).json({ errorMessage: "Invalid credentials" });
    })
    .catch(err =>
      res.status(500).json({ errorMessage: `Error logging in: ${err}` })
    );
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };

  const options = { expiresIn: "1h" };

  return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;
