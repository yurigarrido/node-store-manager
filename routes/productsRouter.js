const express = require('express');

const router = express.Router();

const productsController = require('../controllers/productsController');
const middleware = require('../middlewares/validateProducts');

// R4
router.delete('/:id', 
middleware.validateExistence,
productsController.deleteProdcut);

// R3
router.put('/:id',
  middleware.validateQuantity,
  middleware.validateName,
  middleware.validateExistence,
productsController.update);

// R2
router.get('/:id', productsController.getById);
router.get('/', productsController.getAll);

router.post('/',
  middleware.validateName,
  middleware.validateQuantity, 
  productsController.create);

module.exports = router;