'use strict';

angular.module('encWechatApp')
  .controller('DashboardMealListCtrl', DashboardMealListCtrl);

function DashboardMealListCtrl($scope, $http, $state, $compile, $location, Modal, DTOptionsBuilder, DTColumnBuilder, Auth, Common) {
  var vm = $scope;

  vm.dtInstance = {};
  vm.dtDatasource = {};
  vm.dtOptions = Common.dtOptions('/api/meals', $scope);

  vm.dtColumns = [
    DTColumnBuilder.newColumn('name', '套餐名'),
    DTColumnBuilder.newColumn('price', '价格'),
    DTColumnBuilder.newColumn('description', '描述'),
    DTColumnBuilder.newColumn(null).withTitle('套餐菜品').renderWith(renderMealPackage),
    // DTColumnBuilder.newColumn(null).withTitle('图片').notSortable()
    // .renderWith(dishImageRender),
    DTColumnBuilder.newColumn(null).withTitle('操作').notSortable().renderWith(Common.dtActionsRender(vm))
  ];

  vm.edit = function(data){
    $location.path('/dashboard/meal/meal-edit/' + data._id);
  }

  vm.delete = Common.deleteDTRow('/api/meals/', vm);

  function renderMealPackage(data, type, full, meta){
    if(_.isEmpty(data.package)) {
      return ''
    };

    var li_list = "";
    for(var dish of data.package) {
      li_list += '<li>' + dish.category + ' : ' + dish.name + '</li>';
    }

    return '<ul>' + li_list + '</ul>';
  }
}
