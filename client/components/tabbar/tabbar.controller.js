'use strict';

class TabbarController {
  menu = [{
      'title': '今日菜单',
      'badge': 0,
      'styleClass': 'i_1'
    },
    {
      'title': '我的订单',
      'badge': 36,
      'styleClass': 'i_2'
    },
    {
      'title': '用餐状况',
      'badge': 10,
      'styleClass': 'i_3'
    }];
  focusTabIndex = 0;

  constructor(Auth, $state, $location) {
    this.$state = $state;
    this.$location = $location;
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
  }

  isTabFocus(index) {
    return index == this.focusTabIndex;
  }

  selectTab(index) {
    this.focusTabIndex = index;
    switch (index) {
      case 0: {
        // this.$state.go('daily_serve');
        this.$location.absUrl('https://open.weixin.qq.com/connect/oauth2/authorize?\
          appid=wx59ce4f19ba887044&redirect_uri=http://112.74.107.102:8080/daily_serve&\
          response_type=code&scope=snsapi_userinfo');
        break;
      }
      case 1: {
        // this.$state.go('customer');
        this.$location.absUrl('https://open.weixin.qq.com/connect/oauth2/authorize?\
          appid=wx59ce4f19ba887044&redirect_uri=http://112.74.107.102:8080/customer&\
          response_type=code&scope=snsapi_userinfo');
        break;
      }
      case 2: {
        // this.$state.go('canteen');
        break;
      }
      default :
        this.$location.absUrl('');
        // this.$state.go('daily_serve');
    }
  }

}

angular.module('encWechatApp')
  .controller('TabbarController', TabbarController);
