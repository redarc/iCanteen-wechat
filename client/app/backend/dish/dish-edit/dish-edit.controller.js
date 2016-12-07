'use strict';

angular.module('encWechatApp')
  .controller('DashboardDishEditCtrl', DashboardDishEditCtrl);


function DashboardDishEditCtrl($scope, $http, $log, $stateParams, Auth, Common) {
  var vm = $scope;
  vm.box_title = "编辑菜品";

  var dishId = $stateParams.dishId;
  vm.editData = {};
  vm.selectFiles = [];

  $http({
    url: '/api/dishes/' + dishId,
    method: 'GET',
    headers: {
      "Authorization" : "Bearer " + Auth.getToken()
    }
  })
  .success(function(data) {
    vm.editData = data;
    vm.selectFiles = data.images;
    vm.selected_category = data.category;
    console.log(data);
  })
  .error(function(data){
    console.log(data);
  });

  vm.handleSubmit = function() {
    var verifyInputData = Common.verifyInputData;
    if(!verifyInputData(vm.editData.name, '菜品名为空')) {
      return;
    }

    vm.editData.category = vm.selected_category;

    var postData = vm.editData;
    postData.images = _.map(vm.selectFiles, function(item){
      return _.pick(item, 'path');
    });

    $http({
      url: '/api/dishes/' + dishId,
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
