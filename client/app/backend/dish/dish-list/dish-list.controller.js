'use strict';

angular.module('encWechatApp')
  .controller('DashboardDishListCtrl', DashboardDishListCtrl);

function DashboardDishListCtrl($scope, $http, $state, $compile, $location, Modal, DTOptionsBuilder, DTColumnBuilder, Auth, Common) {
  var vm = $scope;

  vm.dtInstance = {};
  vm.dtDatasource = {};
  vm.dtOptions = Common.dtOptions('/api/dishes', $scope);

  vm.dtColumns = [
    DTColumnBuilder.newColumn('name', '菜名'),
    DTColumnBuilder.newColumn('price', '价格'),
    DTColumnBuilder.newColumn('description', '描述'),
    DTColumnBuilder.newColumn('category', '类型'),
    // DTColumnBuilder.newColumn(null).withTitle('图片').notSortable()
    // .renderWith(dishImageRender),
    DTColumnBuilder.newColumn(null).withTitle('操作').notSortable().renderWith(Common.dtActionsRender(vm))
  ];

  vm.edit = function(data){
    console.log($location.path());
    $location.path('/dashboard/dish/dish-edit/' + data._id);
  }

  vm.delete = Common.deleteDTRow('/api/dishes/', vm);

}
