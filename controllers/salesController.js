const express = require('express');
const rescue = require('express-rescue');

const salesService = require('../services/salesService');
const middlewares = require('./middlewares');

const router = express.Router();

router.post(
  '/',
  middlewares.validateId,
  middlewares.validateQuantitySale,
  rescue(async (req, res) => {
  try {
    const products = req.body;
    const response = await salesService.registerSale(products);
    res.status(201).json(response);
  } catch (error) {
    console.log(error);
  }
  }),
);

module.exports = router;