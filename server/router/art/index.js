const router = require ('koa-router') ()
const articleDB = require ('../../db/article')
const fs = require ("fs");


//获取全部文章列表
router.get ('/all', async ctx => {
  try {
    let data = await articleDB.find ({}, {}, { sort: { pv: - 1 } })
      .populate ("author", { username: 1, tx: 1 })

    ctx.body = {
      code: 0,
      msg: "请求成功!",
      data
    }
  } catch ( err ) {
    console.log (err);
    ctx.body = {
      code: 4,
      data: []
    }
  }
})
//获取单独某篇文章的信息
router.get ("/id", async ctx => {
  let { id } = ctx.query

  let data = await articleDB
    .findById (id)
    .populate ("author", { tx: 1, username: 1 })

  //pv +1
  await articleDB.findByIdAndUpdate (id, { $inc: { pv: 1 } })

  ctx.body = {
    code: 0,
    msg: "查询成功",
    data
  }
})

//获取三个热门文章id
router.get ("/hot", async ctx => {
  let data = await articleDB.find ({}, { title: 1 }, { skip: 0, limit: 3, sort: { pv: - 1 } })
  ctx.body = {
    code: 0,
    msg: "热门文章查询成功",
    data
  }
})
//删除文章
router.get ('/delete', async ctx => {
  let { _id, src } = ctx.query
  let str = src.split ('/')
  src = str.join ('\\')
  await fs.unlink (`${__dirname.split ('\\router')[0]}\\public${src}`, (err) => {
    if ( err ) console.log (err)
  })
  await articleDB.deleteOne ({ _id })
  ctx.body = {
    code: 200,
    msg: '删除成功!'
  }
})

module.exports = router.routes ()
