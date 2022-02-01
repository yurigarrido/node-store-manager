require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const joi = require('joi');

const middlewares = require('./controllers/middlewares');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});



// sem rotas


  // Esta rota não passa pelo middleware de autenticação!
  app.get('/open', (req, res) => {
    res.send('open!');
  });

// rotas especificas


const exemplo = require('./controllers/exemplo');
  /* Todas as rotas com /recipes/<alguma-coisa> entram aqui e vão para o roteador. */
app.use('/recipes', exemplo);


app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
