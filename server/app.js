const koa = require ('koa')
const app = new koa ()
const koaBody = require ('koa-body')
const koaStatic = require ('koa-static')
const cors = require ("koa2-cors")
const session = require ('koa-session')
const { historyApiFallback } = require ('koa2-connect-history-api-fallback');
const path = require ("path");

//监听端口
app.listen (3000)



//连接数据库
require ("./middle/mongoose")

app
  // koa2-connect-history-api-fallback中间件一定要放在静态资源服务中间件前面加载
  .use (historyApiFallback ({
    index: './index.html'
  }))
  .use (koaStatic (
    // 设置静态资源存放的目录
    path.join (__dirname, './public')
  ))

// 处理post
app.use (koaBody ())

const routes = require ('./router/index')
const MongoStore = require ("koa-session-mongo2");

//跨域，测试使用
app.use (cors ({
  origin: function(ctx) {
    if (ctx.url.split('?')[0] === '/art/id') {
      return 'http://127.0.0.1:8080';
    }
    return 'http://localhost:8080';
  },
  credentials: true,
}))


//中间件

app.use (session ({
  store: new MongoStore ({
    url: 'mongodb://localhost:27017',//地址
    db: 'flycat',//库名字
    collection: 'sessions',
    // 这里设置的是数据库session定期清除的时间，与cookie的过期时间应保持一致，cookie由浏览器负责定时清除，需要注意的是索引一旦建立修改的时候需要删除旧的索引。此处的时间是秒为单位，cookie的maxAge是毫秒为单位
    maxAge: 15 * 24 * 60 * 60 * 1000
  }),
  signed: false,
  maxAge: 15 * 24 * 60 * 60 * 1000,
  rolling: true
}, app))


app.use (routes.routes ())
  .use (routes.allowedMethods ())

