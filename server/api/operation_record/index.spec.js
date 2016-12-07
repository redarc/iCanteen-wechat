'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var operationRecordCtrlStub = {
  index: 'operationRecordCtrl.index',
  show: 'operationRecordCtrl.show',
  create: 'operationRecordCtrl.create',
  update: 'operationRecordCtrl.update',
  destroy: 'operationRecordCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var operationRecordIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './operation_record.controller': operationRecordCtrlStub
});

describe('OperationRecord API Router:', function() {

  it('should return an express router instance', function() {
    operationRecordIndex.should.equal(routerStub);
  });

  describe('GET /api/operation_records', function() {

    it('should route to operationRecord.controller.index', function() {
      routerStub.get
        .withArgs('/', 'operationRecordCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/operation_records/:id', function() {

    it('should route to operationRecord.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'operationRecordCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/operation_records', function() {

    it('should route to operationRecord.controller.create', function() {
      routerStub.post
        .withArgs('/', 'operationRecordCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/operation_records/:id', function() {

    it('should route to operationRecord.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'operationRecordCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/operation_records/:id', function() {

    it('should route to operationRecord.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'operationRecordCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/operation_records/:id', function() {

    it('should route to operationRecord.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'operationRecordCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
