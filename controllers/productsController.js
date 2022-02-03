const express = require('express');
const rescue = require('express-rescue');

const productsService = require('../services/productsService');
// const joi = require('joi');

const router = express.Router();

/**
 * C - POST
 * R - GET
 * U - PUT / PATCH
 * D - DELETE
 */

router.post(
  '/', rescue(async (req, res) => {
    try {
      const { name, quantity } = req.body;
      const response = await productsService.addProduct(name, quantity);
      return res.status(201).json(response);
    } catch (err) {
      console.log(err.message);
    }
  }),
);

module.exports = router;
