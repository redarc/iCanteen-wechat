'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var dishCtrlStub = {
  index: 'dishCtrl.index',
  show: 'dishCtrl.show',
  create: 'dishCtrl.create',
  update: 'dishCtrl.update',
  destroy: 'dishCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var dishIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './dish.controller': dishCtrlStub
});

describe('Dish API Router:', function() {

  it('should return an express router instance', function() {
    dishIndex.should.equal(routerStub);
  });

  describe('GET /api/dishes', function() {

    it('should route to dish.controller.index', function() {
      routerStub.get
        .withArgs('/', 'dishCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/dishes/:id', function() {

    it('should route to dish.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'dishCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/dishes', function() {

    it('should route to dish.controller.create', function() {
      routerStub.post
        .withArgs('/', 'dishCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/dishes/:id', function() {

    it('should route to dish.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'dishCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/dishes/:id', function() {

    it('should route to dish.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'dishCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/dishes/:id', function() {

    it('should route to dish.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'dishCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
