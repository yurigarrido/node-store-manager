const salesModel = require('../models/salesModel');
const productsModel = require('../models/productsModel');

const validateUndefined = (req, res, next) => {
  if (!req.body.some((sale) => sale.product_id)) {
    return res.status(400).json({ message: '"product_id" is required' });
  }

  next();
};

const validateQuantity = (req, res, next) => {
  if (req.body.some((sale) => sale.quantity <= 0)) {
    return res.status(422)
    .json({ message: '"quantity" must be a number larger than or equal to 1' });
  }

  if (!req.body.some(({ quantity }) => quantity && quantity !== 0)) {
    return res.status(400).json({ message: '"quantity" is required' });
  }

  if (req.body.some(({ quantity }) => typeof quantity !== 'number')) {
    return res.status(422)
    .json({ message: '"quantity" must be a number larger than or equal to 1' });
  }

  next();
};

const stockValid = async (req, res, next) => {
  const data = await productsModel.getAll();

  const allProducts = req.body;
  allProducts.forEach((product) => {
    const info = data.filter((item) => item.id === product.product_id);
      if (info[0].quantity < product.quantity) {
      //  return res.status(422).json({ message: 'Such amount is not permitted to sell' });
      console.log('deu ruim');
      }
  });
  
  next();
};

const verifySale = async (req, _res, next) => {
  const { id } = req.params;
  const sale = await salesModel.getSaleById(id);
  if (!sale) return;
  next();
};

module.exports = { validateUndefined, validateQuantity, verifySale, stockValid };