var request = require('supertest');
var express = require('express');

var app = require("../../index").getApp;

describe('GET /', function(){
  it('respond with index html page', function(done){
    request(app)
      .get('/')
      .expect('Content-Type', /html/)
      .expect(200, done);
  });
});
