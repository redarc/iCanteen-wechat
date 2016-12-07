'use strict';

angular.module('encWechatApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard.operation_record', {
        url: '/operation_record',
        templateUrl: 'app/backend/operation_record/operation_record.html',
        controller: 'DashboardOperationRecordCtrl'
      });
  });
