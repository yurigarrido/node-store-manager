const express = require('express');
const rescue = require('express-rescue');

const router = express.Router();

const middleware = require('../middlewares/validateProducts');
const service = require('../services/productsService');

/**
 * C - POST
 * R - GET
 * U - PUT / PATCH
 * D - DELETE
 */

const create = async (req, res, _next) => {
      const { name, quantity } = req.body;
      const response = await service.register(name, quantity);
      return res.status(201).send(response);
  };

const getAll = async (_req, res, _next) => {
  try {
    const response = await service.getAll();
    return res.status(200).json(response);
  } catch (err) {
    console.log(err.message);
  }
};

const getById = async (req, res, _next) => {
  try {
    const { id } = req.params;
    const response = await service.getById(id);
    console.log(response.length);
    if (response.length === 0) return res.status(404).json({ message: 'Product not found' });
    return res.status(200).json(response[0]);
  } catch (err) {
    console.log(err.message);
  }
};

const update = async (req, res, _next) => {
    try {
      const { name, quantity } = req.body;
      const { id } = req.params;
      const response = await service.update(name, quantity, id);
      return res.status(200).json(response);
    } catch (err) {
      console.log(err.message);
    }
  };

  const deleteProdcut = async (req, res, _next) => {
    try {
      const { id } = req.params;
      const response = await service.remove(id);
      return res.status(200).json(response);
    } catch (err) {
      console.log(err.message);
    }
  };

module.exports = {
  create,
  getAll,
  getById,
  update,
  deleteProdcut,
};