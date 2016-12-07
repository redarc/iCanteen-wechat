'use strict';

angular.module('encWechatApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard.order', {
        url: '/order',
        abstract: true,
        templateUrl: 'app/backend/order/order.html',
        controller: 'DashboardOrderCtrl'
      })
      .state('dashboard.order.order-list', {
        url: '',
        templateUrl: 'app/backend/order/order-list/order-list.html',
        controller: 'DashboardOrderListCtrl'
      })
      .state('dashboard.order.order-edit', {
        url: '/order-edit/:orderId',
        templateUrl: 'app/backend/order/order-edit/order-edit.html',
        controller: 'DashboardOrderEditCtrl'
      })
      .state('dashboard.order.order-create', {
        url: '/order-create',
        templateUrl: 'app/backend/order/order-edit/order-edit.html',
        controller: 'DashboardOrderCreateCtrl'
      });
  });
