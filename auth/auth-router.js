const router = require('express').Router();
const bcrypt = require('bcryptjs');
const Users = require('./auth-model.js');
const jwt = require('jsonwebtoken')
const secrets = require('../config/secrets.js')

router.post('/register', (req, res) => {
  let user = req.body;
  console.log(user);

  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json({
        message: "Created user. Generated token",
        saved
      });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json(error);
    });
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;


  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
      
        const token = generateToken(user);
        res.status(200).json({
          message: `Welcome ${user.username}!`,
          token
        });
      } else {
        res.status(401).json({
          message: "Invalid Credentials"
        });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Server Error!",
        error
      });
    });
});

function generateToken(user){
  const payload = {
    sub: user.id,
    username: user.username
  };

  const options = {
    expiresIn: '1d'
  };

  return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;
