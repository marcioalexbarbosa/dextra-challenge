var chai = require('chai');
var expect = chai.expect;
var nock = require('nock');
var rp = require('request-promise');
var lanchesResponse = require('./mock/lanches.json');

describe('api', function() {
 
  beforeEach(() => {
    nock('http://localhost:3000')
      .get('/lanche')
      .reply(200, lanchesResponse);
  });

  describe('GET /lanche', function() {
    it("deveria retornar os lanches", (done) => {
      rp('http://localhost:3000/lanche').then(response => {
        var responseParsed = JSON.parse(response);
        expect(responseParsed).to.have.ownPropertyDescriptor('x-bacon');
        done();
      })
    });
    })
})