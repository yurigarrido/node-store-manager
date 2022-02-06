const express = require('express');
const rescue = require('express-rescue');

const productsService = require('../services/productsService');
const middlewares = require('./middlewares');

const router = express.Router();

/**
 * C - POST
 * R - GET
 * U - PUT / PATCH
 * D - DELETE
 */

router.post(
  '/', middlewares.validateName, middlewares.validateQuantity, rescue(async (req, res) => {
    try {
      const { name, quantity } = req.body;
      const response = await productsService.addProduct(name, quantity);
      return res.status(201).json(response);
    } catch (err) {
      console.log(err.message);
    }
  }),
);

// allproducts
router.get('/', rescue(async (_req, res) => {
  try {
    const response = await productsService.allProducts();
    return res.status(200).json(response);
  } catch (err) {
    console.log(err.message);
  }
}));

// produto com o id
router.get('/:id', rescue(async (req, res) => {
  try {
    const { id } = req.params;
    const response = await productsService.oneProduct(id);
    if (response.length === 0) return res.status(404).json({ message: 'Product not found' });
    return res.status(200).json(response[0]);
  } catch (err) {
    console.log(err.message);
  }
}));

// aletra produto com o id
router.put(
  '/:id',
  middlewares.validateQuantity,
  middlewares.validateName,
  middlewares.validateExistence,
  rescue(async (req, res) => {
    try {
      const { name, quantity } = req.body;
      const { id } = req.params;
      const response = await productsService.updateProduct(name, quantity, id);
      return res.status(200).json(response);
    } catch (err) {
      console.log(err.message);
    }
  }),
);

router.delete(
  '/:id', 
  middlewares.validateExistence,
  rescue(async (req, res) => {
    try {
      const { id } = req.params;
      const response = await productsService.deleteProduct(id);
      return res.status(200).json(response);
    } catch (err) {
      console.log(err.message);
    }
  }),
);

module.exports = router;
