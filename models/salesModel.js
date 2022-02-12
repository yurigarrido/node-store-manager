const connection = require('./connection');

// função testada
const createSale = async (values) => {
  const [id] = await connection.execute('INSERT INTO sales (date) VALUES (now())');

  await Promise.all(values.map(async (sale) => {
    await connection.execute(
      'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
      [id.insertId, sale.product_id, sale.quantity],
    );

    await connection.execute('UPDATE products SET quantity = quantity - ? WHERE id = ?',
    [sale.quantity, sale.product_id]);
  }));

  return {
    id: id.insertId,
    itemsSold: values,
  };
};

// função testada
const getAllSales = async () => {
  const [result] = await connection.execute(
    `SELECT p.sale_id AS saleId, s.date, p.product_id, p.quantity
     FROM sales_products AS p INNER JOIN sales AS s ON s.id = p.sale_id`,
  );

  return result;
};

// função testada - falta id inexistente
const getById = async (id) => {
  const [result] = await connection.execute(
    `SELECT s.date, p.product_id, p.quantity 
    FROM sales_products AS p INNER JOIN sales AS s ON p.sale_id = ?`,
     [id],
  );

  // if (result.length === 0) return null;

  return result;
};

// update
const updateById = async ({ productId, quantity, id }) => {
  const [result] = await connection.execute(
    'UPDATE sales_products SET product_id = ?, quantity = ? WHERE sale_id = ?',
    [productId, quantity, id],
  );

  return result;
};

// delete
const deleteById = async (id, sale) => {
  await connection.execute('DELETE FROM sales_products WHERE sale_id = ?', [id]);
  await connection.execute('DELETE FROM sales WHERE id = ?', [id]);
  if (!sale) return sale;
  await Promise.all(sale.map(async (p) => {
    await connection.execute('UPDATE products SET quantity = quantity + ? WHERE id = ?',
    [p.quantity, p.product_id]);
  }));

  return sale;
};

module.exports = { createSale, getById, updateById, getAllSales, deleteById };