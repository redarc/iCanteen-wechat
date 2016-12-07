'use strict';

angular.module('encWechatApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard.user', {
        url: '/user',
        abstract: true,
        templateUrl: 'app/backend/user/user.html',
        controller: 'DashboardUserCtrl'
      })
      .state('dashboard.user.user-list', {
        url: '',
        templateUrl: 'app/backend/user/user-list/user-list.html',
        controller: 'DashboardUserListCtrl'
      })
      .state('dashboard.user.user-edit', {
        url: '/user-edit/:userId',
        templateUrl: 'app/backend/user/user-edit/user-edit.html',
        controller: 'DashboardUserEditCtrl'
      })
      .state('dashboard.user.user-create', {
        url: '/user-create',
        templateUrl: 'app/backend/user/user-edit/user-edit.html',
        controller: 'DashboardUserCreateCtrl'
      });
  });
