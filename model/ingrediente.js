var Ingrediente = function (nome, valor) {
  this.nome = nome;
  this.valor = valor;
}
    
Ingrediente.prototype.nome = '';
Ingrediente.prototype.valor = 0;

module.exports = Ingrediente;
    