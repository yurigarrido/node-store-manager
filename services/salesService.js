const saleModel = require('../models/salesModel');

const register = async (sales) => (saleModel.register(sales));

const getAll = async () => (saleModel.getAll());

const getById = async (id) => (saleModel.getById(id));

const update = async (id, sale) => (saleModel.update(id, sale));

const remove = async (id) => {
  const response = getById(id);

  if (response.length === 0) return null;

  saleModel.remove(id);

  return response;
};

module.exports = {
  register,
  getAll,
  getById,
  update,
  remove,
};