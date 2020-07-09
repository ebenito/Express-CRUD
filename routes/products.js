const router = require('express').Router();
const ProductController = require('../Controllers/ProductController');

router.get('/', ProductController.getAll)
router.post('/', ProductController.insert)
router.put('/:id', ProductController.update)
router.delete('/:id', ProductController.delete)

module.exports = router;