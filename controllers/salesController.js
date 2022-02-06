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

router.get(
  '/:id',
  rescue(async (req, res) => {
  try {
    const { id } = req.params;
    const response = await salesService.getOneSale(id);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
  }),
);

router.get(
  '/',
  rescue(async (req, res) => {
  try {
    const response = await salesService.getAllSales();
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
  }),
);

module.exports = router;