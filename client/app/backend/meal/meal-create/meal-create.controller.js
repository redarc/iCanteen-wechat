'use strict';

angular.module('encWechatApp')
  .controller('DashboardMealCreateCtrl', DashboardMealCreateCtrl);

function DashboardMealCreateCtrl($scope, $http, $log, $state, Auth, SweetAlert, Common) {

  var vm = $scope;
  vm.box_title = "创建套餐";
  vm.editData = {};
  vm.selectFiles = [];

  //init dish multi select list
  $http({
    url: '/api/dishes',
    method: 'GET',
  }).success(function(data, header, config, status) {
    $scope.dish_list = data;
  }).error(function(data, header, config, status) {
    console.log(data);
  });

  vm.handleSubmit = function() {
    var verifyInputData = Common.verifyInputData;
    if(!verifyInputData(vm.editData.name, '套餐名为空')) {
      return;
    }

    var postData = vm.editData;
    postData.package = vm.selected_dish_list;
    postData.images = _.map(vm.selectFiles, function(item){
      return _.pick(item, ['path', 'description']);
    });

    $http({
      url: '/api/meals',
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


