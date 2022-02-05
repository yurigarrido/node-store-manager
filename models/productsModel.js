const { connection } = require('./connection');

const getOneProduct = async (id) => {
  const [result] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
  return result;
};

const getAllProducts = async () => {
  const [result] = await connection.execute('SELECT * FROM products');

  return result;
};

const add = async (name, quantity) => {
  const [result] = await connection.execute(
'INSERT INTO products (name, quantity) VALUES (?, ?)',
[name, quantity],
);
  return { id: result.insertId, name, quantity };
};

const updateProduct = async (name, quantity, id) => {
  await connection.execute(
    `UPDATE products
     SET name = ?, quantity = ?
     WHERE id = ?`,
    [name, quantity, id],
    );
  
  return { id, name, quantity };
};

const deleteProduct = async (id) => {
   await connection.execute(
  'DELETE FROM products WHERE id = ?', [id],
  );
};

module.exports = {
  getAllProducts,
  add,
  getOneProduct,
  updateProduct,
  deleteProduct,
};
