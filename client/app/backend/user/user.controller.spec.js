'use strict';

describe('Controller: DashboardUserCtrl', function () {

  // load the controller's module
  beforeEach(module('encWechatApp'));

  var DashboardUserCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DashboardUserCtrl = $controller('DashboardUserCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    1.should.equal(1);
  });
});
