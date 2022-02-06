const connection = require('./connection');

const registerSale = async (products) => {
  const [sale] = await connection.execute(
    'INSERT INTO sales (date) VALUES (now())',
  );

  const bigInsert = await products.map(async ({ product_id: productId, quantity }) => {
    console.log(sale.insertId, productId, quantity);
    // await connection.execute(
    //   'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    //   [sale.insertId, productId, quantity],
    // );
  });
  Promise.all(bigInsert);

  return {
    id: sale.insertId,
    itemsSold: products,
  };
};

const getAllSales = async () => {
  const [result] = await connection.execute(
  `SELECT s.id as saleId, s.date as date, p.id as product_id, p.quantity FROM products p 
  INNER JOIN sales s ON s.id = p.id`,
  );
  return result;
};

const getOneSale = async (id) => {
  const [result] = await connection.execute(
    `
  SELECT s.date as date, p.id as product_id, p.quantity FROM products p 
  INNER JOIN sales s ON s.id = p.id WHERE s.sale_id = ?
    `, [id],
  );
  return result;
};

module.exports = {
  registerSale,
  getAllSales,
  getOneSale,
};