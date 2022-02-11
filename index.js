require('dotenv').config();
const express = require('express');

const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const productsController = require('./controllers/productsController');
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsController);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
