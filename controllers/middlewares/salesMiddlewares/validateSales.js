// const salesModel = require('../../../models/salesModel');

const validateId = async (req, res, next) => {
  const salesList = req.body;

  if (salesList.some((sale) => !sale.product_id)) {
    return res.status(400).json({ message: '"product_id" is required' });
  }
  next();
};

const validateQuantitySale = async (req, res, next) => {
  const salesList = req.body;

  // verifica a quantidade menor que 0 ou igual a zero
  if (salesList.some((sale) => sale.quantity <= 0)) {
    return res.status(422).json({ 
      message: '"quantity" must be a number larger than or equal to 1', 
    });
  }

  // verifica a existencia 
  if (salesList.some((sale) => !sale.quantity)) {
    return res.status(400).json({ message: '"quantity" is required' });
  }

  // valida se não é string
  if (salesList.some((sale) => typeof sale.quantity === 'string')) {
    return res.status(422).json({ 
      message: '"quantity" must be a number larger than or equal to 1', 
    });
  }

  next();
};

module.exports = {
  validateId,
  validateQuantitySale,
};