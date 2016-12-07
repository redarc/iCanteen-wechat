'use strict';

angular.module('encWechatApp')
  .controller('CustomerCtrl', function ($scope, $http, $cookies, $stateParams, SweetAlert, Auth, Common) {
    //init data
    var vm = $scope;
    vm.employee = {};
    vm.employee.name = '';
    vm.employee.userid = '';
    vm.orderedNotes = Common.orderedNotes;

    moment.locale('zh-cn');
    var day_of_week = moment().weekday() + 1;
    vm.dayOfWeek = moment().format("YYYY-MM-DD") + ' ' + moment.weekdays(day_of_week);

    var oAuth2_code = $stateParams.code;
    getUserInfoByoAuth2(oAuth2_code, function(data) {
      Common.saveEmployee(data);
      var employee = Common.getEmployee();
      if(_.isEmpty(employee) || _.isEmpty(employee.userid)) {
        Common.verifyUserInfoAlert();
        return;
      } else {
        vm.employee = employee;
        getOrderByUserId(employee.userid);
      }
    });

    function getOrderByUserId(userid) {
      $http.get('/api/orders/' + userid)
        .success(function(response, status, headers, config){
          vm.daily_order = response;
          vm.noneOrderNotes = Common.noneOrderNotes;
        })
        .error(function(response, status, headers, config){
          vm.noneOrderNotes = Common.noneOrderNotes;
          console.log(response);
        });
    }

    //get user information by oAuth2
    function getUserInfoByoAuth2(oAuth2_code, callback) {
      if(_.isEmpty(Common.getEmployee())) {
        $http({
          method: 'GET',
          url: '/auth/wechat?code=' + oAuth2_code
        })
        .success(callback)
        .error(function(err){
          Common.verifyUserInfoAlert();
        })
      }
    }

    vm.abortOrder = function() {
      SweetAlert.swal({
         title: "确认取消订餐吗?",
         type: "warning",
         showCancelButton: true,
         confirmButtonColor: "#DD6B55",
         confirmButtonText: "确定",
         cancelButtonText: "取消",
         closeOnConfirm: true,
         allowOutsideClick: true
       },
       function(isConfirm){
         if(isConfirm) {
          $http({
            url: '/api/orders/' + vm.daily_order._id,
            method: "DELETE",
            headers: {
              "Authorization" : "Bearer " + Auth.getToken()
            }
          }).success(function(data, header, config, status){
            vm.daily_order = undefined;
            vm.noneOrderNotes = Common.abortOrderNotes;
          }).error(function(data, header, config, status){
            SweetAlert.swal("取消订餐失败", data.err_message, "error");
            console.log(data);
          });
        }
      });
    }

  });
