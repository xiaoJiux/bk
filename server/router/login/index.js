const router = require('koa-router')()
const userDB = require("../../db/user")
const visitorDB = require("../../db/visitor")


router.post('/',async ctx =>{
    //获取post里面的用户名,密码
    let {username, password} = ctx.request.body

    //检测数据
    if(!password || !username){//两个其中一个为空
        return ctx.body = {
            code:1,
            msg:'参数有误'
        }
    }

    try {

        let doc = await userDB.findOne({username})

        //没有对应的用户
        if (!doc) {
            return ctx.body = {
                code: 2,
                msg: "用户不存在",
                data: {}
            }
        }

        //用户存在，但是密码不正确
        if (doc.password !== password) {
            return ctx.body={
                code: 3,
                msg: "密码错误",
                data: {}
            }
        }

        //登陆成功

        //更新访客信息
        let visitorDoc =await visitorDB.findOne({user: doc._id})
        // console.log(visitorDoc)
        if (visitorDoc) {
            await visitorDB.findOneAndUpdate({user: doc._id},{time: Date.now()})
        }else{
            await visitorDB.create({user: doc._id})
        }

        //更新session
        let userInfo = {
            username: doc.username,
            _id: doc._id,
            tx: doc.tx,
            regTime: doc.regTime,
            isAdmin:doc.admin
        }

        ctx.session.userInfo = userInfo
        return ctx.body={
            code: 0,
            msg: "登陆成功",
            data: userInfo
        }

    }catch (err){

        return ctx.body={
            code:3,
            msg:'服务器错误!'
        }
    }
})

//检测是否登录
router.post("/check", async ctx => {
    console.log (ctx.request.body)
    console.log (ctx.session.userInfo)
    if (ctx.session.userInfo){
        //更新访客信息
        let visitorDoc =  visitorDB.findOne({user: ctx.session.userInfo._id})
        if (visitorDoc) {
            await visitorDB.findOneAndUpdate({user: ctx.session.userInfo._id},{time: Date.now()})
        }else{
            await visitorDB.create({user:ctx.session.userInfo._id})
        }
        //有session信息，登录过了
        return ctx.body = {
            code: 0,
            data: ctx.session.userInfo
        }
    }
    ctx.body = {
        code: 1,
        data: {}
    }
})
module.exports = router.routes()
