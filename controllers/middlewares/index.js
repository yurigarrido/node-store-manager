const {
  validateName,
  validateQuantity,
  validateExistence,
} = require('./productsMiddlewares/validateProducts');

const { validateId, validateQuantitySale } = require('./salesMiddlewares/validateSales');

module.exports = {
  validateName,
  validateQuantity,
  validateExistence,
  // salesMiddlewares
  validateId,
  validateQuantitySale,
};
