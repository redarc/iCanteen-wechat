'use strict';

//NOTE directive selectValue -> html attribute select-value
angular.module('encWechatApp')
  .directive('selectdishcategory', function () {
    return {
      template: '<div class="form-group">\
                   <label>菜品类别</label>\
                   <select class="form-control" ng-model="selectValue"\
                        ng-options="dish_category.value as dish_category.title for dish_category in dish_categories">\
                   </select>\
                 </div>',
      scope: {
        selectValue: '='
      },
      restrict: 'EA',
      controller : function($scope, Common) {
        $scope.dish_categories = Common.DishCategory;
        $scope.selectValue = _.isUndefined($scope.selectValue) ? Common.DishCategory[0].value : $scope.selectValue;
      },
      link: function (scope, element, attrs) {
        // none
      }
    };
  });
