
import passport from 'passport';
import {Strategy as WechatStrategy} from 'passport-wechat-enterprise';

export function setupWeixin(){
  passport.use("wechat-enterprise",new WechatStrategy({
      corpId: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
      corpSecret: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
      callbackURL: "http://112.74.107.102:8080/daily_serve",
      state: "state",
      scope: "snsapi_userinfo"
    },
    function(profile, done) {
      return done(err,profile);
    },
    function getAccessToken(cb) {
      console.log('-----getAccessToken----');
      console.log(cb);
    },
    function saveAccessToken(accessToken, cb){
      console.log('-----saveAccessToken------');
      console.log(accessToken);
    }

  ));
}
