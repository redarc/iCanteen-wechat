'use strict';

angular.module('encWechatApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard.serve-plan', {
        url: '/serve-plan',
        abstract: true,
        templateUrl: 'app/backend/serve-plan/serve-plan.html',
        controller: 'DashboardServePlanCtrl'
      })
      .state('dashboard.serve-plan.serve-plan-list', {
        url: '',
        templateUrl: 'app/backend/serve-plan/serve-plan-list/serve-plan-list.html',
        controller: 'DashboardServePlanListCtrl'
      })
      .state('dashboard.serve-plan.serve-plan-edit', {
        url: '/serve-plan-edit/:servePlanId',
        templateUrl: 'app/backend/serve-plan/serve-plan-edit/serve-plan-edit.html',
        controller: 'DashboardServePlanEditCtrl'
      })
      .state('dashboard.serve-plan.serve-plan-create', {
        url: '/serve-plan-create',
        templateUrl: 'app/backend/serve-plan/serve-plan-edit/serve-plan-edit.html',
        controller: 'DashboardServePlanCreateCtrl'
      });
  });
