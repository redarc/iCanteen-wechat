'use strict';

angular.module('encWechatApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard.order-detail', {
        url: '/order_detail',
        abstract: true,
        templateUrl: 'app/backend/order_detail/order_detail.html',
        controller: 'DashboardOrderDetailCtrl'
      })
      .state('dashboard.order-detail.order-detail-list', {
        url: '/detail?mealId&mealName&dishId&dishName&startDate&endDate',
        templateUrl: 'app/backend/order_detail/order-detail-list/order-detail-list.html',
        controller: 'DashboardOrderDetailListCtrl'
      });
  });
