const exemplo = require('../models/exemplo');

const getAll = async () => exemplo.getAll();

const getById = async (id) => {
  const person = await exemplo.getById(id);

  if (!person) {
    // eslint-disable-next-line no-throw-literal
    throw {
      code: 'not_found',
      message: `person with id "${id}" was not found`,
    };
  }

  return person;
};

module.exports = {
  getAll,
  getById,
};
