// controllers/user.js
const user = require('../models/user.js');
const jwt = require('jsonwebtoken') // 引入koa-jwt
// const jwt = require('koa-jwt'); // 引入koa-jwt
const getUserInfo = function* () {
  const id = this.params.id; // 获取url里传过来的参数里的id
  const result = yield user.getUserById(id); // 通过yield “同步”地返回查询结果
  this.body = result // 将请求的结果放到response的body里返回
}
const postUserAuth = function* () {
  const data = this.request.body; // post过来的数据存在request.body里
  const userInfo = yield user.getUserByName(data.name);
  if (userInfo != null) { // 如果查无此用户会返回null
    if (userInfo.password != data.password) {
      this.body = {
        success: false, // success标志位是方便前端判断返回是正确与否
        info: '密码错误！'
      }
    } else { // 如果密码正确
      const userToken = {
        name: userInfo.user_name,
        id: userInfo.id
      }
      const secret = 'vue-koa-demo'; // 指定密钥，这是之后用来判断token合法性的标志
      const token = jwt.sign(userToken, secret); // 签发token
      this.body = {
        success: true,
        token: token, // 返回token
      }
    }
  } else {
    this.body = {
      success: false,
      info: '用户不存在！' // 如果用户不存在返回用户不存在
    }
  }
}
module.exports = {
  auth: (router) => {
    router.get('/user/:id', getUserInfo); // 定义url的参数是id
    router.post('/user', postUserAuth);
  }
}
