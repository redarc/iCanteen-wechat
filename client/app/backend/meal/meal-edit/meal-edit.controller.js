'use strict';

angular.module('encWechatApp')
  .controller('DashboardMealEditCtrl', DashboardMealEditCtrl);

function DashboardMealEditCtrl($scope, $http, $log, $stateParams, Auth, Common) {
  var vm = $scope;
  vm.box_title = "编辑套餐";

  var mealId = $stateParams.mealId;
  vm.editData = {};
  vm.selectFiles = [];

  //init meal data
  $http({
    url: '/api/meals/' + mealId,
    method: 'GET',
    headers: {
      "Authorization" : "Bearer " + Auth.getToken()
    }
  })
  .success(function(data) {
    vm.editData = data;
    $scope.edit_dish_list = data.package;
    vm.selectFiles = data.images ? data.images : [];

    $http({
      url: '/api/dishes',
      method: 'GET',
    }).success(function(data, header, config, status) {
      var data_list = _.map(data, function(item){
        item.selected = _.contains(_.pluck($scope.edit_dish_list, 'name'),  item.name);
        return item;
      });

      $scope.dish_list = data_list;
    }).error(function(data, header, config, status) {
      console.log(data);
    });
  })
  .error(function(data){
    console.log(data);
  });

  vm.handleSubmit = function() {
    console.log(vm.selected_dish_list);

    var verifyInputData = Common.verifyInputData;
    if(!verifyInputData(vm.editData.name, '套餐名为空')) {
      return;
    }

    var postData = vm.editData;
    postData.package = _.pluck(vm.selected_dish_list, '_id');
    postData.images = _.map(vm.selectFiles, function(item){
      return _.pick(item, 'path');
    });

    // $log.debug('------------- handleSubmit ------------ ');
    // $log.debug(postData);
    // $log.debug('------------- handleSubmit ------------ ');

    $http({
      url: '/api/meals/' + mealId,
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
