const express = require('express');
const rescue = require('express-rescue');

const productsService = require('../services/productsService');
const productsMiddlewares = require('./middlewares/productsMiddlewares/validateProducts');

const router = express.Router();

/**
 * C - POST
 * R - GET
 * U - PUT / PATCH
 * D - DELETE
 */

router.post(
  '/', 
  productsMiddlewares.validateName,
  productsMiddlewares.validateQuantity, 
  rescue(async (req, res) => {
    try {
      const { name, quantity } = req.body;
      const response = await productsService.register(name, quantity);
      return res.status(201).json(response);
    } catch (err) {
      console.log(err.message);
    }
  }),
);

router.get('/', rescue(async (_req, res) => {
  try {
    const response = await productsService.getAll();
    return res.status(200).json(response);
  } catch (err) {
    console.log(err.message);
  }
}));

router.get('/:id', rescue(async (req, res) => {
  try {
    const { id } = req.params;
    const response = await productsService.getById(id);
    if (response.length === 0) return res.status(404).json({ message: 'Product not found' });
    return res.status(200).json(response[0]);
  } catch (err) {
    console.log(err.message);
  }
}));

router.put(
  '/:id',
  productsMiddlewares.validateQuantity,
  productsMiddlewares.validateName,
  productsMiddlewares.validateExistence,
  rescue(async (req, res) => {
    try {
      const { name, quantity } = req.body;
      const { id } = req.params;
      const response = await productsService.update(name, quantity, id);
      return res.status(200).json(response);
    } catch (err) {
      console.log(err.message);
    }
  }),
);

router.delete(
  '/:id', 
  productsMiddlewares.validateExistence,
  rescue(async (req, res) => {
    try {
      const { id } = req.params;
      const response = await productsService.remove(id);
      return res.status(200).json(response);
    } catch (err) {
      console.log(err.message);
    }
  }),
);

module.exports = router;
