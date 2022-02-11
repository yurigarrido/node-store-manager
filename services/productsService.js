const model = require('../models/productsModel');

const register = async (name, quantity) => model.register(name, quantity);

const getAll = async () => model.getAll();

const getById = async (id) => model.getById(id);

const update = async (name, quantity, id) => model.update(name, quantity, id);

const remove = async (id) => {
  const response = await model.getById(id);

  await model.deleteProduct(id);

  return response[0];
};

module.exports = {
  register,
  getAll,
  getById,
  update,
  remove,
};