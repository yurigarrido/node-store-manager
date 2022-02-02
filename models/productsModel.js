const connection = require('./connection');

const getAllProducts = async () => {
  const [result] = await connection.execute('SELECT * FROM StoreManager.products');

  return result;
};

const add = async (name, quantity) => {
  const [result] = await connection.query(
    'INSERT INTO StoreManager.products (name, quantity) VALUES (?, ?);',
    [name, quantity],
  );
  return { id: result.insertId, name, quantity };
};

module.exports = {
  getAllProducts,
  add,
};
