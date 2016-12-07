'use strict';

angular.module('encWechatApp')
  .controller('DashboardOrderDetailListCtrl', DashboardOrderDetailListCtrl);

function DashboardOrderDetailListCtrl($scope, $http, $stateParams, $state, $compile, $location, Modal, DTOptionsBuilder, DTColumnBuilder, Auth, Common) {
  var vm = $scope;

  var mealIdQuery = $stateParams.mealId ? 'mealId=' + $stateParams.mealId : '';
  var dishIdQuery = $stateParams.dishId ? 'dishId=' + $stateParams.dishId : '';
  var startDateQuery = $stateParams.startDate ? '&startDate=' + $stateParams.startDate : '';
  var endDateQuery = $stateParams.endDate ? '&endDate=' + $stateParams.endDate : '';

  var orderTimeMin = $stateParams.startDate ? moment($stateParams.startDate) : moment("00:00", "HH:mm");
  var orderTimeMax = $stateParams.endDate ? moment($stateParams.endDate) : moment("16:00", "HH:mm");

  vm.dateRange = orderTimeMin.format("YYYY-MM-DD") + " ~ " + orderTimeMax.format("YYYY-MM-DD");

  vm.orderTargetName = '';
  if($stateParams.mealName) {
    vm.orderTargetName = $stateParams.mealName;
  }else if($stateParams.dishName) {
    vm.orderTargetName = $stateParams.dishName;
  }

  vm.dtInstance = {};
  vm.dtDatasource = {};

  //http://XXXX/api/orders/summary/detail?startDate=2014-03-05&endDate=2016-05-01&dishId=56a5e708be869c382ff03a3e
  var reqestUrl = '/api/orders/summary/detail?' + mealIdQuery + dishIdQuery + startDateQuery + endDateQuery;
  vm.dtOptions = Common.dtOptions(reqestUrl, $scope);

  vm.dtColumns = [
    DTColumnBuilder.newColumn('employee.name').withOption('defaultContent', '').withTitle('员工姓名'),
    DTColumnBuilder.newColumn('employee.userid').withOption('defaultContent', '').withTitle('工号'),
    DTColumnBuilder.newColumn('employee.mobile').withOption('defaultContent', '').withTitle('电话'),
    DTColumnBuilder.newColumn(function(row) {
      return row.employee.gender == "1" ? "男" : "女";
    }).withOption('defaultContent', '').withTitle('性别'),
    DTColumnBuilder.newColumn(function(row) {
      var departmentIds = row.employee.department;
      var filteredDepartments = _.filter(Common.Department, function(o){
        return departmentIds.includes(o.id);
      });

      return _.map(filteredDepartments, 'name').toString();
    }).withOption('defaultContent', '').withTitle('部门'),
    DTColumnBuilder.newColumn('employee.weixinid').withOption('defaultContent', '').withTitle('微信号'),
    DTColumnBuilder.newColumn('amount').withOption('defaultContent', '').withTitle('订购数量'),
    DTColumnBuilder.newColumn(function(row){
      return moment(row.createdAt).format('YYYY-MM-DD HH:mm');
    }).withOption('defaultContent', '').withTitle('订购时间')
  ];

  // vm.edit = function(data){
  //   $location.path('/dashboard/order/order-edit/' + data._id);
  // }

  // vm.delete = Common.deleteDTRow('/api/orders/admin/', vm);

}
