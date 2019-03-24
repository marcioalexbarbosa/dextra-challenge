const express = require('express');
const cors = require("cors");
const calculos = require('../business/calculos');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/lanche', (req, res) => {
  const lanches = calculos.lanches();
  return res.json(lanches);
});

app.get('/lanche/:nome', (req, res) => {
  const valor = calculos.calculaValorLanche(req.params.nome);
  return res.send(`${valor}`);
});

app.post('/lanche/:nome', (req, res) => {
  const valor = calculos.calculaValorLancheComIngredientes(req.params.nome, req.body.extra);
  return res.send(`${valor}`);
});

app.listen(3000, () =>
  console.log(`app listening on port 3000!`),
);