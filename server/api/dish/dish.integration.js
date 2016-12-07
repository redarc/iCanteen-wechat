'use strict';

var app = require('../..');
import request from 'supertest';

var newDish;

describe('Dish API:', function() {

  describe('GET /api/dishes', function() {
    var dishs;

    beforeEach(function(done) {
      request(app)
        .get('/api/dishes')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          dishs = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      dishs.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/dishes', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/dishes')
        .send({
          name: 'New Dish',
          info: 'This is the brand new dish!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newDish = res.body;
          done();
        });
    });

    it('should respond with the newly created dish', function() {
      newDish.name.should.equal('New Dish');
      newDish.info.should.equal('This is the brand new dish!!!');
    });

  });

  describe('GET /api/dishes/:id', function() {
    var dish;

    beforeEach(function(done) {
      request(app)
        .get('/api/dishes/' + newDish._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          dish = res.body;
          done();
        });
    });

    afterEach(function() {
      dish = {};
    });

    it('should respond with the requested dish', function() {
      dish.name.should.equal('New Dish');
      dish.info.should.equal('This is the brand new dish!!!');
    });

  });

  describe('PUT /api/dishes/:id', function() {
    var updatedDish;

    beforeEach(function(done) {
      request(app)
        .put('/api/dishes/' + newDish._id)
        .send({
          name: 'Updated Dish',
          info: 'This is the updated dish!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedDish = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedDish = {};
    });

    it('should respond with the updated dish', function() {
      updatedDish.name.should.equal('Updated Dish');
      updatedDish.info.should.equal('This is the updated dish!!!');
    });

  });

  describe('DELETE /api/dishes/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/dishes/' + newDish._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when dish does not exist', function(done) {
      request(app)
        .delete('/api/dishes/' + newDish._id)
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
