require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const productsController = require('./controllers/productsController');
const salesController = require('./controllers/salesController');

  /* Todas as rotas com /recipes/<alguma-coisa> entram aqui e vão para o roteador. */
app.use('/products', productsController);
app.use('/sales', salesController);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// sem rotas

  // Esta rota não passa pelo middleware de autenticação!
  // app.get('/open', (req, res) => {
  //   res.send('open!');
  // });

// rotas especificas

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
