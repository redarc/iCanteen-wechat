'use strict';

describe('Controller: MealListCtrl', function () {

  // load the controller's module
  beforeEach(module('encWechatApp'));

  var MealListCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MealListCtrl = $controller('MealListCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    1.should.equal(1);
  });
});
