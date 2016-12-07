# iCanteen-wechat

This project was generated with the [Angular Full-Stack Generator](https://github.com/DaftMonk/generator-angular-fullstack) version 3.2.0.

## Getting Started

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js and npm](nodejs.org) Node ^4.2.3, npm ^2.14.7
- [Bower](bower.io) (`npm install --global bower`)
- [Ruby](https://www.ruby-lang.org) and then `gem install sass`
- [Grunt](http://gruntjs.com/) (`npm install --global grunt-cli`)
- [MongoDB](https://www.mongodb.org/) - Keep a running daemon with `mongod`

### Developing

1. Run `npm install` to install server dependencies.

2. Run `bower install` to install front-end dependencies.

3. Run `mongod` in a separate shell to keep an instance of the MongoDB Daemon running

4. Run `grunt serve` to start the development server. It should automatically open the client in your browser when ready.

## Build & development

Run `grunt build` for building and `grunt serve` for preview.

## Testing

Running `npm test` will run the unit tests with karma.

#CorpID wx59ce4f19ba887044
#Secret wybHugEwzTMOeVooYt-gCYq4vDdnT5kd0MoE8-cIjU_fvRSm540I3Vg_oyz8taBX

1.oAuth2 -> code
----------------------------------------------------------------------------------------
request
https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx59ce4f19ba887044&redirect_uri=http://112.74.107.102:8080/daily_serve&response_type=code&scope=snsapi_userinfo
----------------------------------------------------------------------------------------

response
http://112.74.107.102:8080/daily_serve?code=2e313f9c0d8a74224c445e5daddd2557
----------------------------------------------------------------------------------------

2. access_token
----------------------------------------------------------------------------------------

request
https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=wx59ce4f19ba887044&corpsecret=wybHugEwzTMOeVooYt-gCYq4vDdnT5kd0MoE8-cIjU_fvRSm540I3Vg_oyz8taBX
----------------------------------------------------------------------------------------

response
{"access_token":"lSgJ2QQBKQjSB9lT5LllU3d5uZlMXwTb9vrWt-zy_KtkwjjELApJ6m_FYevFuglq","expires_in":7200}
----------------------------------------------------------------------------------------

3. getUserId
----------------------------------------------------------------------------------------

request
https://qyapi.weixin.qq.com/cgi-bin/user/getuserinfo?access_token=lSgJ2QQBKQjSB9lT5LllU3d5uZlMXwTb9vrWt-zy_KtkwjjELApJ6m_FYevFuglq&code=29ea6612434f4445c339ff176c8d1c13&agentid=wx59ce4f19ba887044
----------------------------------------------------------------------------------------

response
{"UserId":"23464606","DeviceId":"45f4630f7321866f93555b9ced28da75"}
----------------------------------------------------------------------------------------


4. getUser Info with userid and access_token
----------------------------------------------------------------------------------------

request
https://qyapi.weixin.qq.com/cgi-bin/user/get?access_token=lSgJ2QQBKQjSB9lT5LllU3d5uZlMXwTb9vrWt-zy_KtkwjjELApJ6m_FYevFuglq&userid=23464606
----------------------------------------------------------------------------------------

response
{"errcode":0,"errmsg":"ok","userid":"23464606","name":"Gang YAO","department":[15],"mobile":"13337727997","gender":"1","weixinid":"aaronqmm"}
----------------------------------------------------------------------------------------

# How to config wechat enterprise account before deploy http server
1. Craete a App
2. Config App 可信域名 IP:PORT
3. Config App 普通模式 自定义菜单

4. Config App 菜单- 可以直接用oAuth2 认证 redirect自己页面
https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx59ce4f19ba887044&redirect_uri=http://112.74.107.102:8080/daily_serve&response_type=code&scope=snsapi_userinfo

5. 设置-权限管理-系统管理组，将App至于某一管理组下

6. 注意App的通讯录管理权限，否则会出现oAuth2获取不到非通讯录管理权限的用户信息

# How to setup deploy ENV
1.install nginx
2.install node.js
3.build project

PORT=8080 IP=112.74.107.102 pm2 start server/ --name 'encwechat'
PORT=8080 IP=112.74.107.102 pm2 start dist/server/index.js --name encwechat
