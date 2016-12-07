'use strict';

angular.module('encWechatApp')
  .factory('Common', function ($compile, $http, $state, $cookies, SweetAlert, Auth, DTOptionsBuilder, DTColumnBuilder) {

    // Service logic
    var commonFactory = {};

    commonFactory.orderedNotes = "欢迎使用爱用餐，您已预订成功，请在餐厅规定时间内前往用餐，谢谢！"
    commonFactory.noneOrderNotes = "今日您还未订餐，欢迎从今日菜单中订餐，谢谢！"
    commonFactory.abortOrderNotes = "您已取消订餐，欢迎从今日菜单中再次订餐，谢谢！"

    commonFactory.Department = [
        {
            id: 1,
            name: "爱立信南京",
            parentid: 0,
            order: 200
        },
        {
            id: 15,
            name: "NJ R&D",
            parentid: 1,
            order: 2800
        },
        {
            id: 26,
            name: "CLC",
            parentid: 1,
            order: 4600
        },
        {
            id: 28,
            name: "ENC",
            parentid: 1,
            order: 5000
        },
        {
            id: 30,
            name: "OE",
            parentid: 28,
            order: 200
        },
        {
            id: 31,
            name: "OELT",
            parentid: 30,
            order: 200
        },
        {
            id: 32,
            name: "OE Admin",
            parentid: 30,
            order: 400
        },
        {
            id: 33,
            name: "OE Facility",
            parentid: 30,
            order: 600
        },
        {
            id: 34,
            name: "OE Process",
            parentid: 30,
            order: 800
        },
        {
            id: 35,
            name: "OE S&C",
            parentid: 30,
            order: 1000
        },
        {
            id: 29,
            name: "CBC NJ",
            parentid: 1,
            order: 5200
        }
    ];

    commonFactory.Week = [
      {
        title: '周一',
        value: 1
      },
      {
        title: '周二',
        value: 2
      },
      {
        title: '周三',
        value: 3
      },
      {
        title: '周四',
        value: 4
      },
      {
        title: '周五',
        value: 5
      },
      {
        title: '周六',
        value: 6
      },
      {
        title: '周日',
        value: 7
      }
    ];

    commonFactory.DishCategory = [
      {
        title: '主荤',
        value: '主荤'
      },
      {
        title: '副荤',
        value: '副荤'
      },
      {
        title: '蔬菜',
        value: '蔬菜'
      },
      {
        title: '汤',
        value: '汤'
      },
      {
        title: '煲仔',
        value: '煲仔'
      },
      {
        title: '面点小吃',
        value: '面点小吃'
      }
    ]

    //user information
    function Employee(data) {
      var instance = this;

      this.name = data.name;
      this.mobile = data.mobile;
      this.errmsg = data.errmsg;
      this.department = data.department;
      this.attrs = data.attrs;
      this.gender = data.gender;
      this.status = data.status;
      this.userid = data.userid;
      this.weixinid = data.weixinid;
      this.avatar = data.avatar;

      Employee = function(data) {
        return instance;
      }
    };

    var employee = undefined;
    commonFactory.saveEmployee = function(data) {
      this.employee = new Employee(data);
    }

    commonFactory.getEmployee = function() {
      return this.employee;
    }

    commonFactory.createSuccessAlert = function(data) {
        SweetAlert.swal({
          title: "创建成功",
          text: "",
          type: "success",
          showConfirmButton: true,
          allowOutsideClick: true
        },function(){
          window.history.back();
        });
        console.log(data);
      }

    commonFactory.createFailAlert = function(data) {
        var message = data.errmsg ? data.errmsg : data.err_message;
        SweetAlert.swal("创建失败", message, "error");
        console.log(data);
      }

    commonFactory.updateSuccessAlert = function(data) {
        SweetAlert.swal({
          title: "更新成功",
          text: "",
          type: "success",
          showConfirmButton: true,
          allowOutsideClick: true
        },function(){
          window.history.back();
        });
        console.log(data);
      }

    commonFactory.updateFailAlert = function(data) {
        var message = data.message ? data.message : data.err_message;
        SweetAlert.swal("更新失败", message, "error");
        console.log(data);
      }

    commonFactory.verifyInputData = function(input, text) {
        if(_.isEmpty(input)) {
          SweetAlert.swal({
            title: "参数错误",
            text: text,
            type: "error",
            showConfirmButton: true,
            allowOutsideClick: true
          });
          return false;
        }
        return true;
      }

    commonFactory.verifyUserInfoAlert = function() {
      SweetAlert.swal({
        title: "获取用户数据失败",
        text: '无法提交/获取订单, 请关闭页面后重试',
        type: "error",
        showConfirmButton: true,
        allowOutsideClick: true
      });
    }

    commonFactory.verifyUserCodeAlert = function() {
      SweetAlert.swal({
        title: "微信oAuth2鉴权错误",
        text: '无法提交/获取订单, 请关闭页面后重试',
        type: "error",
        showConfirmButton: true,
        allowOutsideClick: true
      });
    }

    commonFactory.dtOptions = function(url, scope) {
        var dtOptions = DTOptionsBuilder.newOptions()
            .withOption('ajax', {
               url: url,
               type: 'GET',
               dataType: 'json',
               beforeSend: function(xhr){
                 xhr.setRequestHeader("Authorization", "Bearer " + Auth.getToken());
               },
               error: function(xhr, status, err){
                if(xhr.status === 401) {
                  SweetAlert.swal({
                    title: "登录鉴权失败",
                    text: '请登录后操作',
                    type: "error",
                    showConfirmButton: true
                  },function(){
                    $state.go('login');
                  });
                } else if(xhr.status === 403){
                  SweetAlert.swal({
                    title: "权限不够",
                    text: '请切换至管理员登录后操作',
                    type: "error",
                    showConfirmButton: true,
                    allowOutsideClick: true
                  });
                }
               }
            })
            .withDOM('flrtip')
            // .withOption('order', [[7, 'desc']])
            .withPaginationType('full_numbers')
            .withOption('createdRow', function(row, data, dataIndex){
              $compile(angular.element(row).contents())(scope);
            })
            .withLanguage({
              "sProcessing":   "处理中...",
              "sLengthMenu":   "显示 _MENU_ 项结果",
              "sZeroRecords":  "没有匹配结果",
              "sInfo":         "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
              "sInfoEmpty":    "显示第 0 至 0 项结果，共 0 项",
              "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
              "sInfoPostFix":  "",
              "sSearch":       "搜索:",
              "sUrl":          "",
              "sEmptyTable":     "表中数据为空",
              "sLoadingRecords": "载入中...",
              "sInfoThousands":  ",",
              "oPaginate": {
                "sFirst":    "首页",
                "sPrevious": "上页",
                "sNext":     "下页",
                "sLast":     "末页"
              },
              "oAria": {
                "sSortAscending":  ": 以升序排列此列",
                "sSortDescending": ": 以降序排列此列"
              }
            })
            .withButtons([
                 'print',
                 'excelHtml5',
                 'csvHtml5'
             ]);
        return dtOptions;
    }

    commonFactory.deleteDTRow = function(url, scope) {
      return function(data) {
        SweetAlert.swal({
           title: "确认删除该信息吗?",
           type: "warning",
           showCancelButton: true,
           confirmButtonColor: "#DD6B55",
           confirmButtonText: "删除",
           cancelButtonText: "取消",
           closeOnConfirm: true,
           allowOutsideClick: true
         },
         function(isConfirm){
           if(isConfirm) {
            $http({
              url: url + data._id,
              method: "DELETE",
              headers: {
                "Authorization" : "Bearer " + Auth.getToken()
              }
            }).success(function(data, header, config, status){
              console.log(data);
              scope.dtInstance.reloadData();
            }).error(function(data, header, config, status){
              SweetAlert.swal("删除失败", data.message, "error");
              console.log(data);
            });
          }
        });
      }
    }

    commonFactory.dtActionsRender = function(scope) {
      return function actionsHtml(data, type, full, meta) {
        scope.dtDatasource[data._id] = data;
        return '<button class="btn btn-warning" ng-click="edit(dtDatasource[\'' + data._id + '\'])">' +
              '   <i class="fa fa-edit"></i>' +
              '</button>&nbsp;' +
              '<button class="btn btn-danger" ng-click="delete(dtDatasource[\'' + data._id + '\'])">' +
              '   <i class="fa fa-trash-o"></i>' +
              '</button>';
        }
    }

    //get user information by oAuth2
    // commonFactory.getUserInfoByoAuth2 = function(oAuth2_code) {
    //   if(_.isEmpty(getEmployee())) {
    //     $http({
    //       method: 'GET',
    //       url: '/auth/wechat?code=' + oAuth2_code
    //     })
    //     .success(function(data){
    //       saveEmployee(data);
    //     })
    //     .error(function(err){
    //       verifyUserInfoAlert();
    //     })
    //   }
    // }

    return commonFactory;
  });
