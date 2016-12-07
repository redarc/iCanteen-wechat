'use strict';

class LoginController {
  //start-non-standard
  user = {};
  errors = {};
  submitted = false;
  //end-non-standard

  constructor(Auth, $state) {
    this.Auth = Auth;
    this.$state = $state;
  }

  login(form) {
    this.submitted = true;

    if (form.$valid) {
      this.Auth.login({
        name: this.user.username,
        password: this.user.password
      })
      .then(() => {
        // Logged in, redirect to home
        this.$state.go('dashboard.home');
      })
      .catch(err => {
        this.errors.other = err.message;
      });
    }
  }
}

angular.module('encWechatApp')
  .controller('LoginController', LoginController);
