var chai = require('chai');
var expect = chai.expect;
var nock = require('nock');
var rp = require('request-promise');
var lanchesResponse = require('./mock/lanches.json');
var ingredientesResponse = require('./mock/ingredientes.json');

describe('api', function() {
 

  describe('GET /lanche', function() {

    before(() => {
      nock('http://localhost:3000')
        .get('/lanche')
        .reply(200, lanchesResponse);
    });

    it("deveria retornar os lanches", (done) => {
      rp('http://localhost:3000/lanche').then(response => {
        var responseParsed = JSON.parse(response);
        expect(responseParsed).to.have.ownPropertyDescriptor('x-bacon');
        done();
      })
    });
  })

  describe('GET /ingrediente', function() {

    before(() => {
      nock('http://localhost:3000')
        .get('/ingrediente')
        .reply(200, ingredientesResponse);
    });

    it("deveria retornar os ingredientes", (done) => {
      rp('http://localhost:3000/ingrediente').then(response => {
        var responseParsed = JSON.parse(response);
        expect(responseParsed).to.have.ownPropertyDescriptor('alface');
        done();
      })
    });
  })

  describe('GET /lanche:nome', function() {

    before(() => {
      nock('http://localhost:3000')
        .get('/lanche/x-burguer')
        .reply(200, "10");
    });

    it("deveria retornar o valor do lanche", (done) => {
      rp('http://localhost:3000/lanche/x-burguer').then(response => {
        var responseParsed = JSON.parse(response);
        expect(responseParsed).to.be.equals(10);
        done();
      })
    });
  })

  describe('POST /lanche:nome', function() {

    var options;

    before(() => {
      nock('http://localhost:3000')
        .post('/lanche/x-burguer')
        .reply(200, "10");
      options = {
        method: 'POST',
        uri: 'http://localhost:3000/lanche/x-burguer',
        body: {
            extra: 'alface'
        },
        json: true // Automatically stringifies the body to JSON
      };        
    });

    it("deveria retornar o valor do lanche", (done) => {
      rp(options).then(response => {
        var responseParsed = JSON.parse(response);
        expect(responseParsed).to.be.equals(10);
        done();
      })
    });
  })

})