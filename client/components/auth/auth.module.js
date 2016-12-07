'use strict';

angular.module('encWechatApp.auth', [
  'encWechatApp.constants',
  'encWechatApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
