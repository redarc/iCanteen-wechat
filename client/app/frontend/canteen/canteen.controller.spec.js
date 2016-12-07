'use strict';

describe('Controller: CanteenCtrl', function () {

  // load the controller's module
  beforeEach(module('encWechatApp'));

  var CanteenCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CanteenCtrl = $controller('CanteenCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    1.should.equal(1);
  });
});
