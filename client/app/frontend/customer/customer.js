'use strict';

angular.module('encWechatApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('customer', {
        url: '/customer?code',
        templateUrl: 'app/frontend/customer/customer.html',
        controller: 'CustomerCtrl'
      });
  });
