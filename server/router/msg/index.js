const msgDB = require("../../db/message")
const router = require('koa-router')()

//留言发表
router.post("/", async ctx => {
  let {userId, msg} = ctx.request.body

  //检测数据格式
  if (!userId || !msg) {
    return ctx.body={
      code: 1,
      msg: "参数错误"
    }
  }

  try {
    //存储留言
    await msgDB.create({
      msg,
      user: userId
    })

    return ctx.body={
      code: 0,
      msg: "留言成功"
    }

  } catch (e) {
    console.log(e);
    return ctx.body={
      code: 4,
      msg: "服务器错误，请稍后再试~"
    }
  }

})

//留言获取
router.get("/", async ctx => {
  let data = await msgDB
    .find({}, {}, {sort: {time: -1}})
    .populate("user", {tx: 1, username: 1})
    .populate("children.user", {tx: 1, username: 1})
    .populate("children.reply", {tx: 1, username: 1})

  ctx.body={
    code: 0,
    msg: "获取留言成功",
    data
  }
})

//留言回复提交
router.post("/reply", async ctx => {
  let {msgId, child} = ctx.request.body
  //验证数据
  if (!msgId || !child || !child.msg || !child.user || !child.reply){
    return ctx.body={
      code: 1,
      msg: "数据格式错误"
    }
  }

  try{
    //更新数据
    await msgDB.updateOne({_id: msgId},{
      $push:{children:child}
    })

    return ctx.body={
      code: 0,
      msg: "回复成功"
    }

  }catch (e) {
    // console.log(e);
    ctx.body={
      code: 4,
      msg: "服务器错误，请稍后再试~"
    }
  }

})

router.post('/like',async ctx =>{
  let {parentId, childId, likes, childIndex} = ctx.request.body
  //是否有数据
  if (!parentId || !childId || !Array.isArray(likes)){
    return ctx.body = {
      code: 1,
      msg: "参数格式错误"
    }
  }

  //判断是否为子留言(true)
  try {
    if (isChild){
      //更新子级的likes
      let key = 'children.'+childIndex+'.likes'
      await msgDB.updateOne({"children._id":childId}, {[key]: likes})
    }else{
      //更新父级的likes
      await msgDB.findByIdAndUpdate(parentId, {likes})
    }

    return ctx.body={
      code: 0,
      msg: "更新完成"
    }
  }catch (e) {
    return ctx.body={
      code: 4,
      msg: "服务器错误，请稍后再试~"
    }
  }
})

module.exports = router.routes()





