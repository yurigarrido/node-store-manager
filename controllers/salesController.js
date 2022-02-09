const express = require('express');
const rescue = require('express-rescue');

const saleService = require('../services/salesService');
const salesMiddleware = require('./middlewares/salesMiddlewares/validateSales');

const router = express.Router();

/**
 * C - POST
 * R - GET
 * U - PUT / PATCH
 * D - DELETE
 */

router.post(
  '/',
  salesMiddleware.validateProductId,
  salesMiddleware.validateSales,
  salesMiddleware.validateQuantity,
  rescue(async (req, res) => {
    const response = await saleService.register(req.body);
 
    res.status(201).json(response);
}),
);

router.get('/', rescue(async (req, res) => {
  const response = await saleService.getAll();
  res.status(200).json(response);
}));

router.get('/:id', 
  // verifica se a venda exist
  rescue(async (req, res) => {
  const response = await saleService.getById(req.params.id);
  console.log(response);
  if (response.length === 0) return res.status(404).json({ message: 'Sale not found' });
  return res.status(200).json(response);
}));

router.put('/:id',
salesMiddleware.validateProductId,
salesMiddleware.validateSales,
salesMiddleware.validateExistsId,
  rescue(async (req, res) => {
    const { id } = req.params;

    const response = await saleService.update(id, req.body);

    return res.status(200).json(response);
}));

router.delete('/:id',
salesMiddleware.validateExistsId,
  rescue(async (req, res) => {
    const { id } = req.params;

    const response = await saleService.getById(id);

    await saleService.remove(id);

    return res.status(200).json(response);
}));

module.exports = router;