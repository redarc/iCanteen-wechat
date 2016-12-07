'use strict';

describe('Controller: DailyServeCtrl', function () {

  // load the controller's module
  beforeEach(module('encWechatApp'));

  var DailyServeCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DailyServeCtrl = $controller('DailyServeCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    1.should.equal(1);
  });
});
