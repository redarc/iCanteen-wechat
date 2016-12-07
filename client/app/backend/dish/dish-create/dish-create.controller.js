'use strict';

angular.module('encWechatApp')
  .controller('DashboardDishCreateCtrl', DashboardDishCreateCtrl);

function DashboardDishCreateCtrl($scope, $http, $log, $state, $qupload, Auth, SweetAlert, $timeout, Common) {

  var vm = $scope;
  vm.box_title = "创建菜品";
  vm.editData = {};
  vm.selectFiles = [];

  vm.handleSubmit = function() {
    var verifyInputData = Common.verifyInputData;
    if(!verifyInputData(vm.editData.name, '菜品名为空')) {
      return;
    }

    var postData = vm.editData;
    postData.category = vm.selected_category;
    postData.images = _.map(vm.selectFiles, function(item){
      return _.pick(item, ['path', 'description']);
    });

    console.log(postData);

    $http({
      url: '/api/dishes',
      method: 'POST',
      data: postData,
      headers: {
        "Authorization" : "Bearer " + Auth.getToken()
      }
    })
    .success(Common.createSuccessAlert)
    .error(Common.createFailAlert);
  }

}

