'use strict';

angular.module('encWechatApp')
  .controller('DailyServeCtrl', function ($scope, $http, $stateParams, $timeout, SweetAlert, Common) {

    //init data
    var oAuth2_code = $stateParams.code;
    getUserInfoByoAuth2(oAuth2_code);
    var vm = $scope;
    vm.isShowToast = false;
    vm.isShowConfirmDialog = false;
    vm.serve_plan = {};

    moment.locale('zh-cn');
    var day_of_week = moment().weekday() + 1;
    vm.dayOfWeek = moment().format("YYYY-MM-DD") + ' ' + moment.weekdays(day_of_week);

    //init today serve
    getTodayServe(day_of_week);

    vm.handleSubmit = function(){
      vm.selected_meal_orders = _.filter(vm.serve_plan.meal_menu, function(item){
        return item.checked;
      });

      vm.selected_dish_orders = _.filter(vm.serve_plan.dish_menu, function(item){
        return item.checked;
      });

      vm.isShowConfirmDialog = true;
    }

    vm.handleCancel = function() {
      vm.isShowConfirmDialog = false;
    }

    vm.handleConfirm = function() {
      vm.isShowConfirmDialog = false;
      if(_.isEmpty(vm.employee)) {
        Common.verifyUserInfoAlert();
        return;
      }

      var postData = {};
      postData.employee = vm.employee;

      postData.meal_orders = _.map(vm.selected_meal_orders, function(item){
        var meal_order = {};
        meal_order.meal = item._id;
        meal_order.amount = 1;//debug
        return meal_order;
      });

      postData.dish_orders = _.map(vm.selected_dish_orders, function(item){
        var dish_order = {};
        dish_order.dish = item._id;
        dish_order.amount = 1;//debug
        return dish_order;
      });

      $http({
        method: 'POST',
        data: postData,
        url: '/api/orders'
      })
      .success(function(response, status, headers, config){

        vm.isShowToast = true;
        vm.toastMessage = '订餐成功';

        $timeout(function(){
          vm.isShowToast = false;
        }, 1000);

      })
      .error(function(response, status, headers, config){
        vm.showAlert = true;
        vm.alertMessage = response.err_message;
      });
    }

    //get user information by oAuth2
    function getUserInfoByoAuth2(oAuth2_code) {
      if(_.isEmpty(Common.getEmployee())) {
        $http({
          method: 'GET',
          url: '/auth/wechat?code=' + oAuth2_code
        })
        .success(function(data){
          Common.saveEmployee(data);
          vm.employee = Common.getEmployee();
        })
        .error(function(err){
          Common.verifyUserInfoAlert();
        })
      }
    }

    function getTodayServe(day_of_week) {
      $http.get('/api/serve_plan/dayOfWeek/' + day_of_week)
        .success(function(response, status, headers, config){
          vm.serve_plan = response;
        })
        .error(function(response, status, headers, config){
          SweetAlert.swal({
            title: "获取今日菜单失败",
            text: '请关闭该页面重新访问',
            type: "error",
            showConfirmButton: true,
            allowOutsideClick: true
          });
          console.log(response);
        });
    }

  });
