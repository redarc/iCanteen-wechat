'use strict';

angular.module('encWechatApp')
  .controller('DashboardOrderListCtrl', DashboardOrderListCtrl);

function DashboardOrderListCtrl($scope, $http, $state, $compile, $location, Modal, DTOptionsBuilder, DTColumnBuilder, Auth, Common) {
  var vm = $scope;

  vm.orderDateRange = {startDate: null, endDate: null};
  vm.dtInstance = {};
  vm.dtDatasource = {};
  vm.dtOptions = Common.dtOptions('/api/orders/summary', $scope);

  vm.startDate = moment("00:00", "HH:mm");
  vm.endDate = moment("16:00", "HH:mm");

  vm.dateRange = vm.startDate.format("YYYY-MM-DD HH:mm") + " ~ " + vm.endDate.format("YYYY-MM-DD HH:mm") + ' 的';

  vm.dtColumns = [
    DTColumnBuilder.newColumn(renderMealName).withOption('defaultContent', '').withTitle('套餐名称'),
    DTColumnBuilder.newColumn(renderDishName).withOption('defaultContent', '').withTitle('单品名称'),
    DTColumnBuilder.newColumn('sum_order_amount').withOption('defaultContent', '').withTitle('预定总份数'),
    DTColumnBuilder.newColumn(function(row){
      return row.sum_ordered_employees.length;
    }).withOption('defaultContent', '').withTitle('预定人数')
  ];

  // vm.edit = function(data){
  //   $location.path('/dashboard/order/order-edit/' + data._id);
  // }

  // vm.delete = Common.deleteDTRow('/api/orders/admin/', vm);

  vm.queryOrderByDateRange = function() {
    vm.startDate = vm.orderDateRange.startDate;
    vm.endDate = vm.orderDateRange.endDate;
    var reqestUrl = '/api/orders/summary';

    if(!_.isEmpty(vm.startDate) && !_.isEmpty(vm.endDate)) {
      reqestUrl += '?startDate=' + vm.startDate.format('YYYY-MM-DD') + '&endDate=' + vm.endDate.format('YYYY-MM-DD');
    }

    vm.dtOptions = Common.dtOptions(reqestUrl, $scope);
    vm.dateRange = vm.startDate.format("YYYY-MM-DD") + " ~ " + vm.endDate.format("YYYY-MM-DD") + ' 的';
  }

  function renderMealName(row) {
    var meal = row.meal;

    var cellValue = meal ? meal.name : '';
    var mealIdQuery = meal ? "mealId=" + meal._id : '';
    var mealNameQuery = meal ? "&mealName=" + meal.name : '';
    var startDateQuery = "&startDate=" + vm.startDate.format("YYYY-MM-DD");
    var endDateQuery = "&endDate=" + vm.endDate.format("YYYY-MM-DD");

    var hrefUrl = "/dashboard/order_detail/detail?" + mealIdQuery + mealNameQuery + startDateQuery + endDateQuery;
    return '<a href=' + hrefUrl + '>' + cellValue + '</a>';
  }

  function renderDishName(row) {
    var dish = row.dish;

    var cellValue = dish ? dish.name : '';
    var dishIdQuery = dish ? "dishId=" + dish._id : '';
    var dishNameQuery = dish ? "&dishName=" + dish.name : '';
    var startDateQuery = "&startDate=" + vm.startDate.format("YYYY-MM-DD");
    var endDateQuery = "&endDate=" + vm.endDate.format("YYYY-MM-DD");

    var hrefUrl = "/dashboard/order_detail/detail?" + dishIdQuery + dishNameQuery + startDateQuery + endDateQuery;
    return '<a href=' + hrefUrl + '>' + cellValue + '</a>';
  }
}
