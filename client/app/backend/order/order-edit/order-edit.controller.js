'use strict';

angular.module('encWechatApp')
  .controller('DashboardOrderEditCtrl', DashboardOrderEditCtrl);

function DashboardOrderEditCtrl($scope, $http, $stateParams, $log, $state, Auth, SweetAlert, Common) {

  var vm = $scope;
  var orderId = $stateParams.orderId;

  vm.box_title = "编辑订餐";
  vm.editData = {};

  //init dish multi select list
  $http({
    url: '/api/orders/admin/' + orderId,
    method: 'GET',
  }).success(function(data, header, config, status) {
    vm.editData = data;
    var employee = data.employee;
    employee.userid = parseInt(employee.userid);
    employee.mobile = parseInt(employee.mobile);

    vm.employee = employee;
    vm.meal_menu = data.meal_orders;
    vm.dish_menu = data.dish_orders;

  }).error(function(data, header, config, status) {
    console.log(data);
  });

  //init dish multi select list
  $http({
    url: '/api/serve_plan',
    method: 'GET',
  }).success(function(data, header, config, status) {
    vm.serve_plans = data;
    vm.selected_serve_plan = data[0]._id;//default value
    vm.changeServePlan($scope.selected_serve_plan);
  }).error(function(data, header, config, status) {
    console.log(data);
  });

  vm.changeServePlan = function(selectedServePlanId) {
    $http({
      url: '/api/serve_plan/' + selectedServePlanId,
      method: 'GET',
    }).success(function(data, header, config, status) {
      vm.meal_menu = data.meal_menu;
      vm.dish_menu = data.dish_menu;
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
      method: 'PUT',
      data: postData,
      url: '/api/orders/' + orderId
      })
    .success(Common.updateSuccessAlert)
    .error(Common.updateFailAlert);
  };

}


