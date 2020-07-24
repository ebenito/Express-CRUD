const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/UserController');


const UserModel = require('../models/User');
const User = require('../models/User');

router.get('/', UserController.getAll);
router.get('/confirm/:id', UserController.confirm);

router.post('/sync', UserController.registerSync);
router.post('/', UserController.registerAsync);

router.put('/:id', UserController.updateAsyc);

router.delete('/sync/:id', UserController.delete);
router.delete('/:id', UserController.deleteAsync);


module.exports = router;
