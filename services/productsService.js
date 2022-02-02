const productsModel = require('../models/productsModel');

const addProduct = async (name, quantity) => {
  const response = await productsModel.add(name, quantity);

  // mid?

  return response;
};

module.exports = {
  addProduct,
};
