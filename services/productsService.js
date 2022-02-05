const productsModel = require('../models/productsModel');

const addProduct = async (name, quantity) => {
  const response = await productsModel.add(name, quantity);

  // mid?

  return response;
};

const allProducts = async () => {
  const response = await productsModel.getAllProducts();
  return response;
};

const oneProduct = async (id) => {
  const response = await productsModel.getOneProduct(id);
  return response;
};

const updateProduct = async (name, quantity, id) => {
  const response = await productsModel.updateProduct(name, quantity, id);
  console.log(response);
  return response;
};

module.exports = {
  addProduct,
  allProducts,
  oneProduct,
  updateProduct,
};