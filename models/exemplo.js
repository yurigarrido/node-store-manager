const connection = require('./connection');

const add = async (name, age) => {
  const [result] = await connection.query(
    'INSERT INTO people (name, age) VALUES (?, ?);',
    [name, age]
  );
  return { id: result.insertId, name, age };
};

module.exports = {
  add,
};
