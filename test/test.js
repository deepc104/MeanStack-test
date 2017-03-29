'use strict';

var chai  = require('chai');
var expect = chai.expect;
var chaiHttp = require('chai-http');
var should = chai.should();
chai.use(chaiHttp);

//var server   = require('../server.js');
var server = 'http://localhost:3000';

describe('Meanapp test cases', function() {  
    it('should have FB page object', function(done) {
	  chai.request(server)
	    .post('/api/fbstats')
	    .send({pid: 'gfghf'})
	    .end(function(err, res){
	      console.log(res);
	      //console.log(err);
          //res.should.have.status(200);
	      //res.should.be.json;
	      //res.body.should.be.a('object');
	      //res.body.should.have.property('name');
	      //res.body.should.have.property('id');
	      done();
	    });
	});
});