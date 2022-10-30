const router = require('koa-router')()
const userDB = require('../../db/user')

//更改用户名
router.post('/name',async ctx => {
    let {newName} = ctx.request.body

    if(!newName){
        return ctx.body = {
            code:1,
            msg:"参数有误"
        }
    }
    //检测是否登录
    if(!ctx.session.userInfo){
        return ctx.body = {
            code: 2,
            msg: "请先登录!"
        }
    }

    try {
        //检测用户名是否存在
        let doc = await userDB.findOne({username:newName})
        if(doc) {
            return ctx.body = {
                code:3,
                msg:'用户名已存在'
            }
        }
        //更新数据
        await userDB.updateOne({_id: ctx.session.userInfo._id}, {username: newName})

        if (ctx.session.userInfo) {
            ctx.session.userInfo.username = newName
        }
        return ctx.body = {
            code:0,
            msg:'更新成功'
        }
    } catch (err) {
        console.log(err);
        return ctx.body = {
            code:4,
            msg:"服务器出错,请稍后再试= ="
        }
    }
})

//更改密码

router.post('/pass',async ctx => {
    let {_id,oldpassword,newpassword} = ctx.request.body

    //监测数据
    let reg = /^[\w\[\]\/\\\-!@#$%^&*()+=|,.<>?:;"'{}]{6,18}$/
    if (!reg.test(oldpassword) || !reg.test(newpassword)) {
        return ctx.body = {
            code: 1,
            msg: "参数格式错误"
        }
    }

    try {
        //检测原密码是否正确
        let doc = await userDB.findById(_id)
        if (!doc || doc.password !== oldpassword){
            return ctx.body = {
                code: 2,
                msg: "原密码错误"
            }
        }

        //更新密码
        await userDB.updateOne({_id},{password:newpassword})
        return ctx.body={
            code: 0,
            msg: "更新成功"
        }

    } catch (e) {
        return ctx.body = {
            code: 4,
            msg: "服务器错误"
        }
    }
})

module.exports = router.routes()