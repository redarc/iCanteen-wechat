'use strict';

angular.module('encWechatApp')
  .directive('weuialert', function () {
    return {
      templateUrl: 'components/weuiAlert/weuiAlert.html',
      restrict: 'E',
      scope: {
        alertTitle : '@',
        alertMessage : '=',
        showAlert: '='
      },
      controller : function($scope, Common) {
        $scope.closeAlert = function() {
          $scope.showAlert = false;
          $scope.alertMessage = '';
        }
      },
      link: function (scope, element, attrs) {
        //none
      }
    };
  });
