'use strict';

var app = require('../..');
import request from 'supertest';

var newOperationRecord;

describe('OperationRecord API:', function() {

  describe('GET /api/operation_records', function() {
    var operationRecords;

    beforeEach(function(done) {
      request(app)
        .get('/api/operation_records')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          operationRecords = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      operationRecords.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/operation_records', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/operation_records')
        .send({
          name: 'New OperationRecord',
          info: 'This is the brand new operationRecord!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newOperationRecord = res.body;
          done();
        });
    });

    it('should respond with the newly created operationRecord', function() {
      newOperationRecord.name.should.equal('New OperationRecord');
      newOperationRecord.info.should.equal('This is the brand new operationRecord!!!');
    });

  });

  describe('GET /api/operation_records/:id', function() {
    var operationRecord;

    beforeEach(function(done) {
      request(app)
        .get('/api/operation_records/' + newOperationRecord._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          operationRecord = res.body;
          done();
        });
    });

    afterEach(function() {
      operationRecord = {};
    });

    it('should respond with the requested operationRecord', function() {
      operationRecord.name.should.equal('New OperationRecord');
      operationRecord.info.should.equal('This is the brand new operationRecord!!!');
    });

  });

  describe('PUT /api/operation_records/:id', function() {
    var updatedOperationRecord;

    beforeEach(function(done) {
      request(app)
        .put('/api/operation_records/' + newOperationRecord._id)
        .send({
          name: 'Updated OperationRecord',
          info: 'This is the updated operationRecord!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedOperationRecord = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedOperationRecord = {};
    });

    it('should respond with the updated operationRecord', function() {
      updatedOperationRecord.name.should.equal('Updated OperationRecord');
      updatedOperationRecord.info.should.equal('This is the updated operationRecord!!!');
    });

  });

  describe('DELETE /api/operation_records/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/operation_records/' + newOperationRecord._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when operationRecord does not exist', function(done) {
      request(app)
        .delete('/api/operation_records/' + newOperationRecord._id)
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
