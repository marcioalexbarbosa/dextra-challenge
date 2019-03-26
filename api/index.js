const express = require('express');
const cors = require("cors");
const lanches = require('../business/lanches');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/ingrediente', (req, res) => {
  const ingredientes = lanches.ingredientes();
  return res.json(ingredientes);
});

app.get('/lanche', (req, res) => {
  const todosOsLanches = lanches.lanches();
  return res.json(todosOsLanches);
});

app.get('/lanche/:nome', (req, res) => {
  const valor = lanches.calculaValorLanche(req.params.nome);
  return res.send(`${valor}`);
});

app.post('/lanche/:nome', (req, res) => {
  const valor = lanches.calculaValorLancheComIngredientes(req.params.nome, req.body.extra);
  return res.send(`${valor}`);
});

app.listen(3000, () => 
  /* eslint-disable-next-line no-console */
  console.log(`app listening on port 3000!`)
);
