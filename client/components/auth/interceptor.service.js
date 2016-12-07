'use strict';

(function() {

function authInterceptor($rootScope, $q, $cookies, $injector, Util, SweetAlert) {
  var state;
  return {
    // Add authorization token to headers
    request(config) {
      config.headers = config.headers || {};
      if ($cookies.get('token') && Util.isSameOrigin(config.url)) {
        config.headers.Authorization = 'Bearer ' + $cookies.get('token');
      }
      return config;
    },

    // Intercept 401s and redirect you to login
    responseError(response) {
      if (response.status === 401) {
        SweetAlert.swal({
          title: "登录鉴权失败",
          text: '请登录后操作',
          type: "error",
          showConfirmButton: true
        },function(){
          //$state.go('login');
          (state || (state = $injector.get('$state'))).go('login');
        });
        // remove any stale tokens
        $cookies.remove('token');
      }
      return $q.reject(response);
    }
  };
}

angular.module('encWechatApp.auth')
  .factory('authInterceptor', authInterceptor);

})();
