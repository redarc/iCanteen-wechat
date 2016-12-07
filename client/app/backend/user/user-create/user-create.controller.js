'use strict';

angular.module('encWechatApp')
  .controller('DashboardUserCreateCtrl', DashboardUserCreateCtrl);

function DashboardUserCreateCtrl($scope, $http, $stateParams, $log, $state, Auth, SweetAlert, Common) {

  var vm = $scope;
  var orderId = $stateParams.orderId;

  vm.box_title = "新建用户";
  vm.editData = {};

  vm.handleSubmit = function() {
    var postData = vm.editData;

    console.log('-------------');
    console.log(postData);
    console.log('-------------');

    $http({
      method: 'POST',
      data: postData,
      url: '/api/users'
      })
    .success(Common.createSuccessAlert)
    .error(Common.createFailAlert);
  };
}


