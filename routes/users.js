const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/UserController');


const UserModel = require('../models/User');
const User = require('../models/User');

/* GET users listing. */
router.get('/', UserController.getAll);

/* POST crear usuarios */
router.post('/sync', UserController.registerSync);
router.post('/', UserController.registerAsync);
router.put('/:id', UserController.updateAsyc);
router.delete('/sync/:id', UserController.delete);
router.delete('/:id', UserController.deleteAsync);


module.exports = router;
