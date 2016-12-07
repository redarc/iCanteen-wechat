'use strict';

describe('Controller: OrderCtrl', function () {

  // load the controller's module
  beforeEach(module('encWechatApp'));

  var OrderCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    OrderCtrl = $controller('OrderCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    1.should.equal(1);
  });
});
