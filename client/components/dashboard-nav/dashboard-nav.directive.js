'use strict';

angular.module('encWechatApp')
  .directive('dashboardNav', function () {
    return {
      templateUrl: 'components/dashboard-nav/dashboard-nav.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });
