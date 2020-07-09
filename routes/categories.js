const router = require('express').Router();
const CategoryController = require('../Controllers/CategoryController');

router.post('/', CategoryController.insert)

module.exports = router;