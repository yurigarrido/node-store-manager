const joiError = require('./joi-error');
const { validateName, validateQuantity} = require('./validateProducts');

module.exports = {
  joiError,
  validateName,
  validateQuantity,
};
