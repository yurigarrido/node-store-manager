const express = require('express');

const router = express.Router();

const service = require('../services/salesService');
const { validateUndefined, validateQuantity /* stockValid */ } = require('../middlewares/validateSales');

router.post('/', validateUndefined, validateQuantity, /* stockValid */ async (req, res) => {
  const response = await service.createSale(req.body);
  return res.status(201).json(response);
});

router.put('/:id', validateUndefined, validateQuantity, async (req, res) => {
  const { id } = req.params;
  const response = await service.updateById(id, req.body[0]);
  res.status(200).json(response);
});

router.get('/', async (_req, res) => {
  const response = await service.getAll();

  return res.status(200).json(response);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const response = await service.getById(id);

  if (response.length === 0) {
    return res.status(404).json({ message: 'Sale not found' });
  }

  res.status(200).json(response);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const response = await service.deleteSale(id);

  if (response.length === 0) return res.status(404).json({ message: 'Sale not found' });

  res.status(200).json(response);
});

module.exports = router;