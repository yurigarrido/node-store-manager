const salesModel = require('../models/salesModel');

const registerSale = async (products) => {
  const response = await salesModel.registerSale(products);
  return response;
};

const getAllSales = async () => {
  const response = await salesModel.getAllSales();
  return response;
};

const getOneSale = async (id) => {
  const response = await salesModel.getOneSale(id);
  return response;
};

module.exports = {
  registerSale,
  getAllSales,
  getOneSale,
};