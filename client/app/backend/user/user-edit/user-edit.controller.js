'use strict';

angular.module('encWechatApp')
  .controller('DashboardUserEditCtrl', DashboardUserEditCtrl);

function DashboardUserEditCtrl($scope, $http, $stateParams, $log, $state, Auth, SweetAlert, Common) {

  console.log($stateParams);

  var vm = $scope;
  var userId = $stateParams.userId;

  vm.box_title = "编辑用户";
  vm.editData = {};

  //init dish multi select list
  $http({
    url: '/api/users/' + userId,
    method: 'GET',
  }).success(function(data, header, config, status) {
    $scope.editData = data;
  }).error(function(data, header, config, status) {
    console.log(data);
  });

  vm.handleSubmit = function() {
    var postData = {};

    console.log('-------------');
    console.log(postData);
    console.log('-------------');

    $http({
      method: 'PUT',
      data: postData,
      url: '/api/users/' + userId
      })
    .success(Common.updateSuccessAlert)
    .error(Common.updateFailAlert);
  };

}


