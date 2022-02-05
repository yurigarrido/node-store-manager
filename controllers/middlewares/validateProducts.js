const productsModel = require('../../models/productsModel');

const validateName = async (req, res, next) => {
  const { name } = req.body;

  const allProducts = await productsModel.getAllProducts();
  const isUnique = allProducts.find((item) => item.name === name);

  if (!name) {
    return res.status(400).json({ message: '"name" is required' });
  }

  if (name.length < 5) {
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  }

  if (!isUnique) {
    return next();
  }

  return res.status(409).json({ message: 'Product already exists' });
};

const validateQuantity = (req, res, next) => {
  const { quantity } = req.body;

  if (typeof quantity === 'string' || quantity <= 0) {
    return res.status(422)
      .json({ message: '"quantity" must be a number larger than or equal to 1' });
  }

  if (!quantity) {
    return res.status(400).json({ message: '"quantity" is required' });
  }

  next();
};

const validateExistence = async (req, res, next) => {
  const { id } = req.params;

  const exists = await productsModel.getOneProduct(id);
  if (exists.length === 0) return res.status(404).json({ message: 'Product not found' });

  next();
};

module.exports = { validateName, validateQuantity, validateExistence };
