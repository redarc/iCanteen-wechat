'use strict';

angular.module('encWechatApp')
  .controller('DashboardServePlanCreateCtrl', DashboardServePlanCreateCtrl);

function DashboardServePlanCreateCtrl($scope, $http, $log, $state, Auth, SweetAlert, Common) {

  var vm = $scope;
  vm.box_title = "创建供餐计划";
  vm.editData = {};

  //init dish multi select list
  $http({
    url: '/api/dishes',
    method: 'GET',
  }).success(function(data, header, config, status) {
    $scope.dish_list = data;
  }).error(function(data, header, config, status) {
    console.log(data);
  });

  //init meal multi select list
  $http({
    url: '/api/meals',
    method: 'GET',
  }).success(function(data, header, config, status) {
    $scope.meal_list = data;
  }).error(function(data, header, config, status) {
    console.log(data);
  });

  vm.handleSubmit = function() {
    console.log('----------');
    console.log(vm.selected_dish_list);
    console.log('----------');

    console.log('----------');
    console.log(vm.selected_meal_list);
    console.log('----------');

    if(_.isEmpty(vm.selected_dish_list) && _.isEmpty(vm.selected_meal_list)) {
      SweetAlert.swal("提交参数错误","请选择套餐或菜品单品","error" );
      return;
    }

    var postData = vm.editData;
    postData.days_of_week = vm.selected_day;
    postData.meal_menu = vm.selected_meal_list;
    postData.dish_menu = vm.selected_dish_list;

    $http({
      url: '/api/serve_plan',
      method: 'POST',
      data: postData,
      headers: {
        "Authorization" : "Bearer " + Auth.getToken()
      }
    })
    .success(Common.createSuccessAlert)
    .error(Common.createFailAlert);
  };

}


