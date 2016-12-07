'use strict';

angular.module('encWechatApp')
  .controller('DashboardServePlanListCtrl', DashboardServePlanListCtrl);

function DashboardServePlanListCtrl($scope, $http, $state, $compile, $location, Modal, DTOptionsBuilder, DTColumnBuilder, Auth, Common) {
  var vm = $scope;

  vm.dtInstance = {};
  vm.dtDatasource = {};
  vm.dtOptions = Common.dtOptions('/api/serve_plan', $scope);

  vm.dtColumns = [
    DTColumnBuilder.newColumn(function(row){
      return _.findWhere(Common.Week, {value : row.days_of_week}).title;
    }).withTitle('星期X'),
    DTColumnBuilder.newColumn(null).withTitle('套餐列表').renderWith(renderMealMenu),
    DTColumnBuilder.newColumn(null).withTitle('菜品单品列表').renderWith(renderDishMenu),
    DTColumnBuilder.newColumn('line_name', '餐厅'),
    DTColumnBuilder.newColumn(function(row){
      return moment(row.createdAt).format('YYYY-MM-DD HH:mm');
      }).withTitle('创建时间'),
    DTColumnBuilder.newColumn(function(row){
      return moment(row.updatedAt).format('YYYY-MM-DD HH:mm');
      }).withTitle('更新时间'),
    DTColumnBuilder.newColumn(null).withTitle('操作').notSortable().renderWith(Common.dtActionsRender(vm))
  ];

  vm.edit = function(data){
    $location.path('/dashboard/serve-plan/serve-plan-edit/' + data._id);
  }

  vm.delete = Common.deleteDTRow('/api/meals/', vm);

  function renderMealMenu(data, type, full, meta){
    if(_.isEmpty(data.meal_menu)) {
      return ''
    };

    var li_list = "";
    for(var meal of data.meal_menu) {
      li_list += '<li>' + meal.name + '</li>';
    }

    return '<ul>' + li_list + '</ul>';
  }

  function renderDishMenu(data, type, full, meta){
    if(_.isEmpty(data.dish_menu)) {
      return ''
    };

    var li_list = "";
    for(var dish of data.dish_menu) {
      li_list += '<li>' + dish.category + ' : ' + dish.name + '</li>';
    }

    return '<ul>' + li_list + '</ul>';
  }
}
