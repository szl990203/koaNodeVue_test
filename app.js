/*
 * @Author: shanzhilin
 * @Date: 2021-02-26 23:03:05
 * @LastEditors: shanzhilin
 * @LastEditTime: 2021-02-26 23:05:34
 */
const Koa = require('koa')
const router = require('koa-router')()
const json = require('koa-json')
const logger = require('koa-logger')
const bodyParser = require('koa-bodyparser')
const auth = require('./server/routes/auth')
const api = require('./server/routes/api')
const jwt = require('koa-jwt')
// const jwt = require('jsonwebtoken')
const app = new Koa()
app.use(bodyParser());
app.use(json())
app.use(logger())

app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  await next();
});

app.use(async (ctx, next) => {
  const start = new Date;
  await next();
  const ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms); // 显示执行的时间
});
app.use(function* (next) { //  如果JWT验证失败，返回验证失败信息
  try {
    yield next;
  } catch (err) {
    if (401 == err.status) {
      this.status = 401;
      this.body = {
        success: false,
        token: null,
        info: 'Protected resource, use Authorization header to get access'
      };
    } else {
      throw err;
    }
  }
});


app.on('error', function (err, ctx) {
  console.log('server error', err);
});

router.use('/auth', auth.routes());
router.use("/api", api.routes()) 
app.use(router.routes());

app.listen(8889, () => {
  console.log('project is running http://localhost:8889');
});

module.exports = app
