'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var servePlanCtrlStub = {
  index: 'servePlanCtrl.index',
  show: 'servePlanCtrl.show',
  create: 'servePlanCtrl.create',
  update: 'servePlanCtrl.update',
  destroy: 'servePlanCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var servePlanIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './serve_plan.controller': servePlanCtrlStub
});

describe('ServePlan API Router:', function() {

  it('should return an express router instance', function() {
    servePlanIndex.should.equal(routerStub);
  });

  describe('GET /api/serve_plan', function() {

    it('should route to servePlan.controller.index', function() {
      routerStub.get
        .withArgs('/', 'servePlanCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/serve_plan/:id', function() {

    it('should route to servePlan.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'servePlanCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/serve_plan', function() {

    it('should route to servePlan.controller.create', function() {
      routerStub.post
        .withArgs('/', 'servePlanCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/serve_plan/:id', function() {

    it('should route to servePlan.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'servePlanCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/serve_plan/:id', function() {

    it('should route to servePlan.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'servePlanCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/serve_plan/:id', function() {

    it('should route to servePlan.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'servePlanCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
