const model = require('../models/salesModel');

// create
const createSale = async (values) => {
  const result = await model.createSale(values);
  return result;
};

// ready
const getAll = async () => (model.getAllSales());
const getById = async (id) => (model.getById(id));

// update
const updateById = async (id, body) => {
  const productUpdated = { productId: body.product_id, quantity: body.quantity, id: Number(id) };
  await model.updateById(productUpdated);

  return {
    saleId: Number(id),
    itemUpdated: [body],
  };
};

// delete
const deleteSale = async (id) => {
  const sale = await model.getById(id);
  const response = await model.deleteById(id, sale);
  return response;
};

module.exports = { createSale, getAll, getById, updateById, deleteSale };