'use strict';

angular.module('encWechatApp')
  .controller('DashboardServePlanEditCtrl', DashboardServePlanEditCtrl);

function DashboardServePlanEditCtrl($scope, $http, $stateParams, $log, $state, Auth, SweetAlert, Common) {

  var vm = $scope;
  vm.box_title = "编辑供餐计划";
  vm.editData = {};
  var servePlanId = $stateParams.servePlanId;

  console.log(servePlanId);

  function initDishListWithSelectedDishes(selectedDishes){
    //init dish multi select list
    $http({
      url: '/api/dishes',
      method: 'GET'
    }).success(function(data, header, config, status) {
      var data_list = _.map(data, function(item){
        item.selected = _.contains(_.pluck(selectedDishes, 'name'),  item.name);
        return item;
      });

      // console.log(data_list);
      $scope.dish_list = data_list;
    }).error(function(data, header, config, status) {
      console.log(data);
    });
  }

  function initMealListWithSelectedMeals(selectedMeals){

    //init meal multi select list
    $http({
      url: '/api/meals',
      method: 'GET'
    }).success(function(data, header, config, status) {
      var data_list = _.map(data, function(item){
        item.selected = _.contains(_.pluck(selectedMeals, 'name'),  item.name);
        return item;
      });

      // console.log(data_list);
      $scope.meal_list = data_list;
    }).error(function(data, header, config, status) {
      console.log(data);
    });

  }

  //init serve-plan editData
  $http({
    url: '/api/serve_plan/' + servePlanId,
    method: 'GET'
  }).success(function(data, header, config, status) {
    $scope.editData = data;
    $scope.selected_day = data.days_of_week;

    initDishListWithSelectedDishes(data.dish_menu);
    initMealListWithSelectedMeals(data.meal_menu);

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
      url: '/api/serve_plan/' + servePlanId,
      method: 'PUT',
      data: postData,
      headers: {
        "Authorization" : "Bearer " + Auth.getToken()
      }
    })
    .success(Common.updateSuccessAlert)
    .error(Common.updateFailAlert);
  };

}


