const Ingrediente = require('./ingrediente');

const Setup = {};

Setup.cria = () => {
  return new Promise(resolve => {
    const alface = new Ingrediente('alface', 0.4);
    const bacon = new Ingrediente('bacon', 2);
    const hamburguer = new Ingrediente('hamburguer', 3);
    const ovo = new Ingrediente('ovo', 0.8);
    const queijo = new Ingrediente('queijo', 1.50);
    Setup.ingredientes = {};
    Setup.ingredientes['alface'] = alface;
    Setup.ingredientes['bacon'] = bacon;
    Setup.ingredientes['hamburguer'] = hamburguer;
    Setup.ingredientes['ovo'] = ovo;
    Setup.ingredientes['queijo'] = queijo;
  
    const ingredientesXBacon = [bacon, hamburguer, queijo];
    Setup.lanches = {};
    Setup.lanches['x-bacon'] = ingredientesXBacon;
    
    const ingredientesXBurguer = [hamburguer, queijo];
    Setup.lanches['x-burguer'] = ingredientesXBurguer;
    
    const ingredientesXEgg = [ovo, hamburguer, queijo];
    Setup.lanches['x-egg'] = ingredientesXEgg
  
    const ingredientesXEggBacon = [ovo, bacon, hamburguer, queijo];
    Setup.lanches['x-egg-bacon'] = ingredientesXEggBacon;
    resolve();
  });
};

module.exports = Setup;
