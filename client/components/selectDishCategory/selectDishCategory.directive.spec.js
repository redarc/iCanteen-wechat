'use strict';

describe('Directive: selectDishCategory', function () {

  // load the directive's module
  beforeEach(module('encWechatApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<select-dish-category></select-dish-category>');
    element = $compile(element)(scope);
    element.text().should.equal('this is the selectDishCategory directive');
  }));
});
