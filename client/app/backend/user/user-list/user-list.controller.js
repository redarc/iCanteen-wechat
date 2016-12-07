'use strict';

angular.module('encWechatApp')
  .controller('DashboardUserListCtrl', DashboardUserListCtrl);

function DashboardUserListCtrl($scope, $http, $state, $compile, $location, Modal, DTOptionsBuilder, DTColumnBuilder, Auth, Common) {
  var vm = $scope;

  vm.dtInstance = {};
  vm.dtDatasource = {};
  vm.dtOptions = Common.dtOptions('/api/users', $scope);

  vm.dtColumns = [
    DTColumnBuilder.newColumn('name', '菜名'),
    DTColumnBuilder.newColumn('price', '价格'),
    DTColumnBuilder.newColumn('description', '描述'),
    DTColumnBuilder.newColumn('category', '类型'),
    // DTColumnBuilder.newColumn(null).withTitle('图片').notSortable()
    // .renderWith(userImageRender),
    DTColumnBuilder.newColumn(null).withTitle('操作').notSortable().renderWith(Common.dtActionsRender(vm))
  ];

  console.log(ret);

  vm.edit = function(data){
    $location.path('/dashboard/user/user-edit/' + data._id);
  }

  vm.delete = Common.deleteDTRow('/api/users/', vm);

}
