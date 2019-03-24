var setup = require('../model/setup');
var lanches = require('../business/lanches');
var expect = require('chai').expect;

describe('lanches', function() {

  before(function(done) {
    setup.cria().then(done);
  })

  describe('#verificaDescontoLight', function() {
    context('tem so alface', function() {
      it('deveria retornar 10', function() {
        expect(lanches.verificaDescontoLight([setup.ingredientes['alface']])).to.be.equals(10);
      })
    })
    context('tem so bacon', function() {
      it('deveria retornar 0', function() {
        expect(lanches.verificaDescontoLight([setup.ingredientes['bacon']])).to.be.equals(0);
      })
    })
    context('tem alface e ovo', function() {
      it('deveria retornar 10', function() {
        expect(lanches.verificaDescontoLight([setup.ingredientes['alface'], 
        setup.ingredientes['ovo']])).to.be.equals(10);
      })
    })
    context('tem bacon e ovo', function() {
      it('deveria retornar 0', function() {
        expect(lanches.verificaDescontoLight([setup.ingredientes['bacon'], 
        setup.ingredientes['ovo']])).to.be.equals(0);
      })
    })
    context('tem bacon e alface', function() {
      it('deveria retornar 0', function() {
        expect(lanches.verificaDescontoLight([setup.ingredientes['bacon'], 
        setup.ingredientes['alface']])).to.be.equals(0);
      })
    })
  })

  describe('#verificaMuitoIngrediente()', function() {
    context('pouca carne', function() {
      it('deveria retornar 0', function() {
        expect(lanches.verificaMuitoIngrediente('hamburguer', 
        [setup.ingredientes['hamburguer'], setup.ingredientes['hamburguer']])).to.be.equals(0);
      })
    })
    context('muita carne', function() {
      it('deveria retornar 1', function() {
        expect(lanches.verificaMuitoIngrediente('hamburguer', 
        [setup.ingredientes['hamburguer'], 
        setup.ingredientes['hamburguer'], 
        setup.ingredientes['hamburguer']])).to.be.equals(1);
      })
    })
    context('pouco queijo', function() {
      it('deveria retornar 0', function() {
        expect(lanches.verificaMuitoIngrediente('queijo', 
        [setup.ingredientes['queijo'], setup.ingredientes['queijo']])).to.be.equals(0);
      })
    })
    context('muito queijo', function() {
      it('deveria retornar 1', function() {
        expect(lanches.verificaMuitoIngrediente('queijo', 
        [setup.ingredientes['queijo'], 
        setup.ingredientes['queijo'], 
        setup.ingredientes['queijo']])).to.be.equals(1);
      })
    })
  })

  describe('#verificaMuitaCarne()', function() {
    context('pouca carne', function() {
      it('deveria retornar 0', function() {
        expect(lanches.verificaMuitaCarne(
        [setup.ingredientes['hamburguer'], setup.ingredientes['hamburguer']])).to.be.equals(0);
      })
    })
    context('muita carne', function() {
      it('deveria retornar 1', function() {
        expect(lanches.verificaMuitaCarne(
        [setup.ingredientes['hamburguer'], 
        setup.ingredientes['hamburguer'], 
        setup.ingredientes['hamburguer']])).to.be.equals(1);
      })
    })
    context('muita carne mesmo', function() {
      it('deveria retornar 2', function() {
        expect(lanches.verificaMuitaCarne(
        [setup.ingredientes['hamburguer'], 
        setup.ingredientes['hamburguer'], 
        setup.ingredientes['hamburguer'], 
        setup.ingredientes['hamburguer'], 
        setup.ingredientes['hamburguer'], 
        setup.ingredientes['hamburguer'], 
        setup.ingredientes['hamburguer']])).to.be.equals(2);
      })
    })
  })
 
  describe('#verificaMuitoQueijo()', function() {
    context('pouco queijo', function() {
      it('deveria retornar 0', function() {
        expect(lanches.verificaMuitoQueijo(
        [setup.ingredientes['queijo'], setup.ingredientes['queijo']])).to.be.equals(0);
      })
    })
    context('muito queijo', function() {
      it('deveria retornar 1', function() {
        expect(lanches.verificaMuitoQueijo(
        [setup.ingredientes['queijo'], 
        setup.ingredientes['queijo'], 
        setup.ingredientes['queijo']])).to.be.equals(1);
      })
    })
    context('muito queijo mesmo', function() {
      it('deveria retornar 2', function() {
        expect(lanches.verificaMuitoQueijo(
        [setup.ingredientes['queijo'], 
        setup.ingredientes['queijo'], 
        setup.ingredientes['queijo'], 
        setup.ingredientes['queijo'], 
        setup.ingredientes['queijo'], 
        setup.ingredientes['queijo'], 
        setup.ingredientes['queijo']])).to.be.equals(2);
      })
    })
  })

  describe('#calculaValorLanche()', function() {
    context('lanches validos', function() {
      context('x-bacon', function() {
        it('deveria retornar valor maior do que zero', function() {
          expect(lanches.calculaValorLanche('x-bacon')).to.be.above(0);
        })
      })
      context('x-burguer', function() {
        it('deveria retornar valor maior do que zero', function() {
          expect(lanches.calculaValorLanche('x-burguer')).to.be.above(0);
        })
      })
      context('x-egg', function() {
        it('deveria retornar valor maior do que zero', function() {
          expect(lanches.calculaValorLanche('x-egg')).to.be.above(0);
        })
      })
      context('x-egg-bacon', function() {
        it('deveria retornar valor maior do que zero', function() {
          expect(lanches.calculaValorLanche('x-egg-bacon')).to.be.above(0);
        })
      })
      context('lanches invalidos', function() {
        context('x-paulistinha', function() {
          it('deveria retornar zero', function() {
            expect(lanches.calculaValorLanche('x-paulistinha')).to.be.equals(0);
          })
        })
        context('bauru', function() {
          it('deveria retornar zero', function() {
            expect(lanches.calculaValorLanche('bauru')).to.be.equals(0);
          })
        })
      })
    })
  })

  describe('#calculaValorLancheComIngredientes', function() {
    context('x-bacon', function() {
      context('sem extras', function() {
        it('deveria ser igual ao calculo normal', function() {
          expect(lanches.calculaValorLancheComIngredientes('x-bacon')).to.be
          .equals(lanches.calculaValorLanche('x-bacon'));
        })
      })
      context('com extras', function() {
        it('deveria ser maior do que o preco do ingrediente', function() {
          expect(lanches.calculaValorLancheComIngredientes('x-bacon', ['alface'])).to.be
          .above(setup.ingredientes['alface'].valor);
        })
      })
    })
    context('x-burguer', function() {
      context('sem extras', function() {
        it('deveria ser igual ao calculo normal', function() {
          expect(lanches.calculaValorLancheComIngredientes('x-burguer')).to.be
          .equals(lanches.calculaValorLanche('x-burguer'));
        })
      })
      context('com extras', function() {
        it('deveria ser maior do que o preco do ingrediente', function() {
          expect(lanches.calculaValorLancheComIngredientes('x-burguer', ['alface'])).to.be
          .above(setup.ingredientes['alface'].valor);
        })
      })
    })
    context('x-egg', function() {
      context('sem extras', function() {
        it('deveria ser igual ao calculo normal', function() {
          expect(lanches.calculaValorLancheComIngredientes('x-egg')).to.be
          .equals(lanches.calculaValorLanche('x-egg'));
        })
      })
      context('com extras', function() {
        it('deveria ser maior do que o preço do ingrediente', function() {
          expect(lanches.calculaValorLancheComIngredientes('x-egg', ['alface'])).to.be
          .above(setup.ingredientes['alface'].valor);
        })
      })
    })
    context('x-egg-bacon', function() {
      context('sem extras', function() {
        it('deveria ser igual ao calculo normal', function() {
          expect(lanches.calculaValorLancheComIngredientes('x-egg-bacon')).to.be
          .equals(lanches.calculaValorLanche('x-egg-bacon'));
        })
      })
      context('com extras', function() {
        it('deveria ser maior do que o preço do ingrediente', function() {
          expect(lanches.calculaValorLancheComIngredientes('x-egg-bacon', ['alface'])).to.be
          .above(setup.ingredientes['alface'].valor);
        })
      })
    })

  })

  describe('#lanches', function() {
    context('x-bacon', function() {
      it('deveria conter a propriedade x-bacon', function() {
        expect(lanches.lanches()).to.have.ownPropertyDescriptor('x-bacon')
      })
    })
    context('x-burguer', function() {
      it('deveria conter a propriedade x-burguer', function() {
        expect(lanches.lanches()).to.have.ownPropertyDescriptor('x-burguer')
      })
    })
    context('x-egg', function() {
      it('deveria conter a propriedade x-egg', function() {
        expect(lanches.lanches()).to.have.ownPropertyDescriptor('x-egg')
      })
    })
    context('x-egg-bacon', function() {
      it('deveria conter a propriedade x-egg-bacon', function() {
        expect(lanches.lanches()).to.have.ownPropertyDescriptor('x-egg-bacon')
      })
    })
    context('bauru', function() {
      it('nao deveria conter a propriedade bauru', function() {
        expect(lanches.lanches()).to.not.have.ownPropertyDescriptor('bauru')
      })
    })

  })

})