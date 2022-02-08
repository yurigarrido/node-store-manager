const productService = require('../../../services/productsService');
const saleService = require('../../../services/salesService');

const validateProductId = (req, res, next) => {
  const sales = req.body;

  const existsId = sales.some((sale) => sale.product_id);
  const existsQuantity = sales.some((sale) => sale.quantity);
  const quantityEqualZero = sales.some((sale) => sale.quantity === 0);

  if (!existsId) return res.status(400).json({ message: '"product_id" is required' });

  if (quantityEqualZero) {
    return res.status(422).json(
      { message: '"quantity" must be a number larger than or equal to 1' },
    ); 
  }

  if (!existsQuantity) return res.status(400).json({ message: '"quantity" is required' });

  next();
};

const validateSales = (req, res, next) => {
  const sales = req.body;

  let err = 0;

  sales.forEach((sale) => {
    if (sale.quantity < 1 || typeof sale.quantity !== 'number') err += 1;
  });

  if (err > 0) {
    return res.status(422).json(
      { message: '"quantity" must be a number larger than or equal to 1' },
    );
  }
  next();
};

const validateExistsId = async (req, res, next) => {
  const { id } = req.params;
  const row = await saleService.getById(id);
  console.log(id);
  if (row.length === 0) return res.status(404).json({ message: 'Sale not found' });

  next();
};

const validateQuantity = (req, res, next) => {
  const sales = req.body;

  sales.forEach((sale) => {
    const row = productService.getById(sale.product_id);

    if (row.quantity < sale.quantity) {
      return res.status(422).json(
        { message: 'Such amount is not permitted to sell' },
      );
    }
  });

  next();
};

module.exports = {
  validateProductId,
  validateSales,
  validateExistsId,
  validateQuantity,
};