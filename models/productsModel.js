const { connection } = require('./connection');

const getAllProducts = async () => {
  const conn = await connection;
  const [result] = await conn.execute('SELECT * FROM products');

  return result;
};

const add = async (name, quantity) => {
  const conn = await connection;

  const [result] = await conn.execute(
'INSERT INTO products (name, quantity) VALUES (?, ?)',
[name, quantity],
);
  return { id: result.insertId, name, quantity };
};

module.exports = {
  getAllProducts,
  add,
};
