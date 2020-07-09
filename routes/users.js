var express = require('express');
var router = express.Router();
const UserModel = require('../models/User');
const User = require('../models/User');

/* GET users listing. */
router.get('/', function(req, res, next) {
  UserModel.find({})
   .then(users=>res.send(users))
   .catch(console.error);
});

/* POST crear usuarios */
router.post('/', function(req, res, next) {
  UserModel.create(req.body)
   .then(user=>res.send(user))
   .catch(console.error);
});


module.exports = router;
