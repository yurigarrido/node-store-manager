const productsModel = require('../models/productsModel');

const register = async (name, quantity) => productsModel.register(name, quantity);

const getAll = async () => productsModel.getAll();

const getById = async (id) => productsModel.getById(id);

const update = async (name, quantity, id) => productsModel.update(name, quantity, id);

const remove = async (id) => {
  const response = await productsModel.getById(id);

  await productsModel.deleteProduct(id);

  return response[0];
};

module.exports = {
  register,
  getAll,
  getById,
  update,
  remove,
};
