const express = require('express');

const router = express.Router();

const salesController = require('../controllers/salesController');
const { validateUndefined, 
  validateQuantity /* stockValid */ } = require('../middlewares/validateSales');

// R10
router.delete('/:id', salesController.deleteById);

// R7
router.put('/:id', validateUndefined, validateQuantity, salesController.updateById);

// R5
router.post('/', validateUndefined, validateQuantity, salesController.create);

// R6
router.get('/:id', salesController.getById);
router.get('/', salesController.getAll);

module.exports = router;