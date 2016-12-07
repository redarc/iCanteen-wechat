'use strict';

describe('Controller: MealEditCtrl', function () {

  // load the controller's module
  beforeEach(module('encWechatApp'));

  var MealEditCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MealEditCtrl = $controller('MealEditCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    1.should.equal(1);
  });
});
