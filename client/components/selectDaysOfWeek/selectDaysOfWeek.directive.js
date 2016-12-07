'use strict';

angular.module('encWechatApp')
  .directive('selectdayofweek', function () {
    return {
      template: '<div class="form-group">\
                   <label>星期X</label>\
                   <select class="form-control" ng-model="selectValue"\
                        ng-options="day.value as day.title for day in days_of_week">\
                   </select>\
                 </div>',
      scope: {
        selectValue: '='
      },
      restrict: 'EA',
      controller : function($scope, Common) {
        $scope.days_of_week = Common.Week;
        $scope.selectValue = _.isUndefined($scope.selectValue) ? Common.Week[0].value : $scope.selectValue;
      },
      link: function (scope, element, attrs) {
        //none
      }
    };
  });
