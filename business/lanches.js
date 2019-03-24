const setup = require('../model/setup');

setup.cria();

const Lanches = {};

Lanches.verificaDescontoLight = (ingredientes) => {
  // se o lanche tem alface e não tem bacon ganha 10% de desconto
  let temAlface = false;
  let temBacon = false;
  ingredientes.forEach(ingrediente => {
    let nome = ingrediente.nome;
    if (nome === 'alface') {
      temAlface = true;
    } else if (nome === 'bacon') {
      temBacon = true;
    }
  });
  if (temAlface && !temBacon) {
    return 10;
  }
return 0;
};

Lanches.verificaMuitoIngrediente = (nome, ingredientes) => {
  let total = 0;
  let totalDesconto = 0;
  ingredientes.forEach(ingrediente => {
    let nomeIngrediente = ingrediente.nome;
    if (nomeIngrediente === nome) {
      total++;
    }
    if (total > 0 && total % 3 === 0) {
      totalDesconto++;
    }
  });
  console.log('total', total);
  console.log('totalDesconto', totalDesconto);
  return totalDesconto;
};

Lanches.verificaMuitaCarne = (ingredientes) => {
  return Lanches.verificaMuitoIngrediente('hamburguer', ingredientes);
};

Lanches.verificaMuitoQueijo = (ingredientes) => {
  return Lanches.verificaMuitoIngrediente('queijo', ingredientes);
};

Lanches.calculaValorLanche = (nome) => {
  const lanche = setup.lanches[nome];
  if (lanche === undefined) {
    return 0;
  }
  let valor = 0;
  lanche.forEach(element => {
    valor += element.valor;
  });
  return valor;
};

Lanches.calculaValorLancheComIngredientes = (nome, extra) => {
  if (!extra) {
    return Lanches.calculaValorLanche(nome);
  }
  const lanche = setup.lanches[nome];
  ingredientes = [];
  let valor = 0;
  lanche.forEach(element => {
    valor += element.valor;
    ingredientes.push(element);
  });
  extra.forEach(element => {
    let ingrediente = setup.ingredientes[element];
    console.log('ingrediente', ingrediente);
    valor += ingrediente.valor;
    ingredientes.push(ingrediente);
  });
  const descontoLight = Lanches.verificaDescontoLight(ingredientes);
  console.log('desconto', descontoLight);
  if (descontoLight > 0) {
    desconto = (descontoLight * valor) / 100.0;
    valor = valor - desconto;
  }
  const totalDescontoCarne = Lanches.verificaMuitaCarne(ingredientes);
  if (totalDescontoCarne > 0) {
    let valorCarne = setup.ingredientes['hamburguer'].valor;
    valor -= totalDescontoCarne * valorCarne;
  }
  const totalDescontoQueijo = Lanches.verificaMuitoQueijo(ingredientes);
  if (totalDescontoQueijo > 0) {
    let valorQueijo = setup.ingredientes['queijo'].valor;
    valor -= totalDescontoQueijo * valorQueijo;
  }
  return valor;
};

Lanches.lanches = () => {
  console.log('lanches', setup.lanches);
  return setup.lanches;
};

module.exports = Lanches;