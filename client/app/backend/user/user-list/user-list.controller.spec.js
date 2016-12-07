'use strict';

describe('Controller: DishListCtrl', function () {

  // load the controller's module
  beforeEach(module('encWechatApp'));

  var DishListCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DishListCtrl = $controller('DishListCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    1.should.equal(1);
  });
});
