const salesModel = require('../models/salesModel');

const registerSale = async (products) => {
  const response = await salesModel.registerSale(products);
  return response;
};

module.exports = {
  registerSale,
};