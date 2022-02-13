require('dotenv').config();
const express = require('express');

const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const productsRouter = require('./routes/productsRouter');
const salesController = require('./controllers/salesController');
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsRouter);
app.use('/sales', salesController);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
