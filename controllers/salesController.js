const service = require('../services/salesService');

const create = async (req, res, _next) => {
  const response = await service.createSale(req.body);
  return res.status(201).json(response);
};

const updateById = async (req, res, _next) => {
  const { id } = req.params;
  const response = await service.updateById(id, req.body[0]);
  res.status(200).json(response);
};

const getAll = async (_req, res, _next) => {
  const response = await service.getAll();

  return res.status(200).json(response);
};

// função sendo testada
const getById = async (req, res, _next) => {
  const { id } = req.params;

  const response = await service.getById(id);

  if (response.length === 0) {
    return res.status(404).json({ message: 'Sale not found' });
  }

  res.status(200).json(response);
};

const deleteById = async (req, res, _next) => {
  const { id } = req.params;

  const response = await service.deleteSale(id);

  if (response.length === 0) return res.status(404).json({ message: 'Sale not found' });

  res.status(200).json(response);
};

module.exports = { 
  getAll,
  getById,
  create,
  deleteById,
  updateById,
};