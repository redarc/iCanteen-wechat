'use strict';

angular.module('encWechatApp')
  .controller('DashboardUserListCtrl', DashboardUserListCtrl);

function DashboardUserListCtrl($scope, $http, $state, $compile, $location, Modal, DTOptionsBuilder, DTColumnBuilder, Auth, Common) {
  var vm = $scope;

  vm.dtInstance = {};
  vm.dtDatasource = {};
  vm.dtOptions = Common.dtOptions('/api/users', $scope);

  vm.dtColumns = [
    DTColumnBuilder.newColumn("name", "用户名"),
    DTColumnBuilder.newColumn(function(row){
      return _.isEmpty(row.email) ? '' : row.email;
    }).withTitle('邮箱'),
    DTColumnBuilder.newColumn(function(row){
      return _.isEmpty(row.phone) ? '' : row.phone;
    }).withTitle('手机'),
    DTColumnBuilder.newColumn("role", "权限"),
    DTColumnBuilder.newColumn(null).withTitle('操作').notSortable().renderWith(Common.dtActionsRender(vm))
  ];

  vm.edit = function(data){
    $location.path('/dashboard/user/user-edit/' + data.employee_phone);
  }

  vm.delete = Common.deleteDTRow('/api/users/', vm);
}
