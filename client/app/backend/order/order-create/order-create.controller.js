'use strict';

angular.module('encWechatApp')
  .controller('DashboardOrderCreateCtrl', DashboardOrderCreateCtrl);

function DashboardOrderCreateCtrl($scope, $http, $log, $state, Auth, SweetAlert, Common) {
  var vm = $scope;
  vm.box_title = "创建订餐";

  vm.editData = {};
  vm.employee = {};

  //init dish multi select list
  $http({
    url: '/api/serve_plan',
    method: 'GET',
  }).success(function(data, header, config, status) {
    $scope.serve_plans = data;
    $scope.selected_serve_plan = data[0]._id;//default value
    vm.changeServePlan($scope.selected_serve_plan);
  }).error(function(data, header, config, status) {
    console.log(data);
  });

  vm.changeServePlan = function(selectedServePlanId) {
    $http({
      url: '/api/serve_plan/' + selectedServePlanId,
      method: 'GET',
    }).success(function(data, header, config, status) {

      $scope.meal_menu = data.meal_menu;
      $scope.dish_menu = data.dish_menu;
    }).error(function(data, header, config, status) {
      console.log(data);
    });
  }

  vm.handleSubmit = function() {
    var meal_orders = [];
    for(var meal of $scope.meal_menu) {
      if(!_.isUndefined(meal.amount)) {
        var meal_order = {};
        meal_order.meal = meal._id;
        meal_order.amount = meal.amount;
        meal_orders.push(meal_order);
      }
    }

    var dish_orders = [];
    for(var dish of $scope.dish_menu) {
      if(!_.isUndefined(dish.amount)) {
        var dish_order = {};
        dish_order.dish = dish._id;
        dish_order.amount = dish.amount;
        dish_orders.push(dish_order);
      }
    }

    var postData = {};
    postData.employee = vm.employee;
    postData.meal_orders = meal_orders;
    postData.dish_orders = dish_orders;

    $http({
      method: 'POST',
      data: postData,
      url: '/api/orders/admin'
      })
    .success(Common.createSuccessAlert)
    .error(Common.createFailAlert);
  };

}


