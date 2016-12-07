'use strict';

angular.module('encWechatApp')
  .directive('tabbar', () => ({
    templateUrl: 'components/tabbar/tabbar.html',
    restrict: 'E',
    scope: {
      tabIndex: '@tabIndex'
    },
    controller: 'TabbarController',
    controllerAs: 'tab'
  }));
