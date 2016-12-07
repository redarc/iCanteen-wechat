'use strict';

describe('Controller: MealCreateCtrl', function () {

  // load the controller's module
  beforeEach(module('encWechatApp'));

  var MealCreateCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MealCreateCtrl = $controller('MealCreateCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    1.should.equal(1);
  });
});
