var setup = require('../model/setup');
var expect = require('chai').expect;

const obtemMembers = (objeto) => {
  var members = []
  objeto.forEach(function(e){
    members.push(e.nome)
  })
  return members;
}

describe('#cria()', function() {

  before(function(done) {
    setup.cria().then(done);
  })

  context('ingredientes', function() {
    it('deveria criar um objeto de nome ingredientes', function() {
      expect(setup).to.have.property('ingredientes');
    })
  })

  context('alface', function() {
    it('deveria ter um ingrediente chamado alface', function() {
      expect(setup.ingredientes).to.have.ownPropertyDescriptor('alface');
    })

    it('com uma propriedade chamada valor', function() {
      expect(setup.ingredientes['alface']).to.have.ownPropertyDescriptor('valor');
    })

    it('com valor maior do que zero', function() {
      expect(setup.ingredientes['alface'].valor).to.be.above(0);
    })
  })

  context('bacon', function() {
    it('deveria ter um ingrediente chamado bacon', function() {
      expect(setup.ingredientes).to.have.ownPropertyDescriptor('bacon');
    })

    it('com uma propriedade chamada valor', function() {
      expect(setup.ingredientes['bacon']).to.have.ownPropertyDescriptor('valor');
    })

    it('com valor maior do que zero', function() {
      expect(setup.ingredientes['bacon'].valor).to.be.above(0);
    })
  })

  context('hamburguer', function() {
    it('deveria ter um ingrediente chamado hamburguer', function() {
      expect(setup.ingredientes).to.have.ownPropertyDescriptor('hamburguer');
    })

    it('com uma propriedade chamada valor', function() {
      expect(setup.ingredientes['hamburguer']).to.have.ownPropertyDescriptor('valor');
    })

    it('com valor maior do que zero', function() {
      expect(setup.ingredientes['hamburguer'].valor).to.be.above(0);
    })
  })

  context('ovo', function() {
    it('deveria ter um ingrediente chamado ovo', function() {
      expect(setup.ingredientes).to.have.ownPropertyDescriptor('ovo');
    })

    it('com uma propriedade chamada valor', function() {
      expect(setup.ingredientes['ovo']).to.have.ownPropertyDescriptor('valor');
    })

    it('com valor maior do que zero', function() {
      expect(setup.ingredientes['ovo'].valor).to.be.above(0);
    })
  })

  context('queijo', function() {
    it('deveria ter um ingrediente chamado queijo', function() {
      expect(setup.ingredientes).to.have.ownPropertyDescriptor('queijo');
    })

    it('com uma propriedade chamada valor', function() {
      expect(setup.ingredientes['queijo']).to.have.ownPropertyDescriptor('valor');
    })

    it('com valor maior do que zero', function() {
      expect(setup.ingredientes['queijo'].valor).to.be.above(0);
    })
  })

  context('lanches', function() {
    it('deveria ter uma propriedade chamada lanches', function() {
      expect(setup).to.have.ownPropertyDescriptor('lanches');
    })

    context('x-bacon', function() {
      it('deveria ter um lanche chamado x-bacon', function() {
        expect(setup.lanches).to.have.ownPropertyDescriptor('x-bacon');
      })

      var members;
      before(function() {
        members = obtemMembers(setup.lanches['x-bacon']);
      })

      it('com ingredientes bacon, hamburguer e queijo', function() {
        expect(members).to.have.lengthOf(3);
        expect(members).to.have.members(['bacon','hamburguer', 'queijo']);
      })
    })

    context('x-burguer', function() {
      it('deveria ter um lanche chamado x-burguer', function() {
        expect(setup.lanches).to.have.ownPropertyDescriptor('x-burguer');
      })

      var members;
      before(function() {
        members = obtemMembers(setup.lanches['x-burguer']);
      })

      it('com ingredientes hamburguer e queijo', function() {
        expect(members).to.have.lengthOf(2);
        expect(members).to.have.members(['hamburguer', 'queijo']);
      })
    })

    context('x-egg', function() {
      it('deveria ter um lanche chamado x-egg', function() {
        expect(setup.lanches).to.have.ownPropertyDescriptor('x-egg');
      })

      var members;
      before(function() {
        members = obtemMembers(setup.lanches['x-egg']);
      })

      it('com ingredientes ovo, hamburguer e queijo', function() {
        expect(members).to.have.lengthOf(3);
        expect(members).to.have.members(['ovo', 'hamburguer', 'queijo']);
      })
    })

    context('x-egg-bacon', function() {
      it('deveria ter um lanche chamado x-egg-bacon', function() {
        expect(setup.lanches).to.have.ownPropertyDescriptor('x-egg-bacon');
      })

      var members;
      before(function() {
        members = obtemMembers(setup.lanches['x-egg-bacon']);
      })

      it('com ingredientes ovo, bacon, hamburguer e queijo', function() {
        expect(members).to.have.lengthOf(4);
        expect(members).to.have.members(['ovo', 'bacon', 'hamburguer', 'queijo']);
      })
    })

  })


})