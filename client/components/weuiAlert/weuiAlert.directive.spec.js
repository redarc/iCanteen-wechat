'use strict';

describe('Directive: weuiAlert', function () {

  // load the directive's module and view
  beforeEach(module('encWechatApp'));
  beforeEach(module('components/weuiAlert/weuiAlert.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<weui-alert></weui-alert>');
    element = $compile(element)(scope);
    scope.$apply();
    element.text().should.equal('this is the weuiAlert directive');
  }));
});
