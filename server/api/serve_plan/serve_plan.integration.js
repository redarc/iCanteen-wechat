'use strict';

var app = require('../..');
import request from 'supertest';

var newServePlan;

describe('ServePlan API:', function() {

  describe('GET /api/serve_plan', function() {
    var servePlans;

    beforeEach(function(done) {
      request(app)
        .get('/api/serve_plan')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          servePlans = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      servePlans.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/serve_plan', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/serve_plan')
        .send({
          name: 'New ServePlan',
          info: 'This is the brand new servePlan!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newServePlan = res.body;
          done();
        });
    });

    it('should respond with the newly created servePlan', function() {
      newServePlan.name.should.equal('New ServePlan');
      newServePlan.info.should.equal('This is the brand new servePlan!!!');
    });

  });

  describe('GET /api/serve_plan/:id', function() {
    var servePlan;

    beforeEach(function(done) {
      request(app)
        .get('/api/serve_plan/' + newServePlan._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          servePlan = res.body;
          done();
        });
    });

    afterEach(function() {
      servePlan = {};
    });

    it('should respond with the requested servePlan', function() {
      servePlan.name.should.equal('New ServePlan');
      servePlan.info.should.equal('This is the brand new servePlan!!!');
    });

  });

  describe('PUT /api/serve_plan/:id', function() {
    var updatedServePlan;

    beforeEach(function(done) {
      request(app)
        .put('/api/serve_plan/' + newServePlan._id)
        .send({
          name: 'Updated ServePlan',
          info: 'This is the updated servePlan!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedServePlan = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedServePlan = {};
    });

    it('should respond with the updated servePlan', function() {
      updatedServePlan.name.should.equal('Updated ServePlan');
      updatedServePlan.info.should.equal('This is the updated servePlan!!!');
    });

  });

  describe('DELETE /api/serve_plan/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/serve_plan/' + newServePlan._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when servePlan does not exist', function(done) {
      request(app)
        .delete('/api/serve_plan/' + newServePlan._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
