const router = require('koa-router')()
const userDB = require("../../db/user")

//注册账号
router.post('/', async ctx => {
    // console.log(ctx.request.body);
    let {username, password} = ctx.request.body
    //验证数据
    if (!username || !password || !/^[\w\u4e00-\u9fa5]{2,8}$/.test(username) || !/^[\w\[\]\/\\\-!@#$%^&*()+=|,.<>?:;"'{}]{6,18}$/.test(password)) {
        return ctx.body = {
            code:1,
            msg: "用户名或密码格式错误"
        }
    }
    try {
        //验证用户是否存在
        let doc = await userDB.findOne({username})

        if(doc) {//用户存在
            return ctx.body={
                code:2,
                msg:'用户已注册,请重新选择用户名'
            }
        }
        await userDB.create({username,password})
        return ctx.body={
            code:0,
            msg:'注册成功'
        }
    }catch (err){
        console.log(err)
        return ctx.body={
            code:3,
            msg:'服务器错误!'
        }
    }
})

module.exports = router.routes()