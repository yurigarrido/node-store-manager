const connection = require('./connection');

const registerSale = async (products) => {
  const [sale] = await connection.execute('INSERT INTO sales (date) VALUES (now())');

  await Promise.all(products.map(async (product) => {
    await connection.execute(
      'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
      [sale.insertId, product.product_id, product.quantity],
    );

    // await connection.execute('UPDATE products SET quantity = quantity - ? WHERE id = ?',
    // [product.quantity, product.product_id]);
  }));

  return {
    id: sale.insertId,
    itemsSold: products,
  };
};

module.exports = {
  registerSale,
};