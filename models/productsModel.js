const { connection } = require('./connection');

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

module.exports = {
  getAllProducts,
  add,
};
