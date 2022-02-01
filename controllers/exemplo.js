const express = require('express');
const rescue = require('express-rescue');

const router = express.Router();

/**
 * C - POST
 * R - GET
 * U - PUT / PATCH
 * D - DELETE
 */

//  const peopleSchema = joi.object({
//   name: joi.string().min(3).required(),
//   age: joi.number().min(1).required(),
// });

// const validatePeopleSchema = (body) => {
//   const { error } = peopleSchema.validate(body);

//   if (error) {
//     throw error;
//   }
// };

// /* POST /people */
// people.post(
//   '/',
//   rescue(async (req, res) => {
//     validatePeopleSchema(req.body);

//     const { name, age } = req.body;

//     const newPerson = await peopleService.add({ name, age });

//     res.status(201).json(newPerson);
//   })
// );

router.get('/', (_req, res) => {
  res.status(200).json('');
});
