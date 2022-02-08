const connection = require('./connection');

const register = async (sales) => {
  const [row] = await connection.execute('INSERT INTO sales (date) VALUES (now())');

  sales.map(async (sale) => {
    await connection.execute(
      'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
      [row.insertId, sale.product_id, sale.quantity],
    );

    await connection.execute(
      'UPDATE products SET quantity = quantity - ? WHERE id = ?',
      [sale.quantity, sale.product_id],
    );
  });

  return {
    id: row.insertId,
    itemsSold: sales,
  };
};

const getAll = async () => {
  const [rows] = await connection.execute(
    `SELECT sp.sale_id saleId, s.date, sp.product_id, sp.quantity
    FROM sales s
    JOIN sales_products sp
    ON s.id = sp.sale_id`,
  );

  return rows;
};

const getById = async (id) => {
  const [row] = await connection.execute(
    `SELECT s.date, sp.product_id, sp.quantity
    FROM sales s 
    JOIN sales_products sp 
    ON s.id = sp.sale_id
    WHERE s.id = ?`,
    [id],
  );

  return row;
};

const update = async (id, sale) => {
  await connection.execute(
    `UPDATE sales_products
      SET product_id = ?, 
        quantity = ?
      WHERE sale_id = ?`,
    [sale[0].product_id, sale[0].quantity, id],
  );

  return {
    saleId: Number(id),
    itemUpdated: sale,
  };
};

const remove = async (id) => {
  const rows = await getById(id);

  await connection.execute(
    'DELETE FROM sales_products WHERE sale_id = ?',
    [id],
  );

  await connection.execute(
    'DELETE FROM sales WHERE id = ?',
    [id],
  );

  rows.map(async (row) => {
    await connection.execute(
      'UPDATE products SET quantity = quantity + ? WHERE id = ?',
      [row.quantity, row.product_id],
    );
  });

  return true;
};

module.exports = {
  register,
  getAll,
  getById,
  update,
  remove,
};