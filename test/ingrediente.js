var Ingrediente = require('../model/ingrediente');
var expect = require('chai').expect;

describe('Ingrediente', function() {

  context('objeto', function() {
    
    var ingrediente;
    before(function() {
      ingrediente = new Ingrediente('alface', 10); 
    })

    it('deveria criar um objeto com propriedade nome', function() {
      expect(ingrediente).to.have.property('nome');
    })
    it('deveria criar um objeto com propriedade valor', function() {
      expect(ingrediente).to.have.property('valor');
    })
  })

})