const router = require('koa-router')()
const visitorDB = require("../../db/visitor")

router.get('/',async ctx =>{
    try{
        let data = await visitorDB.find({},{},{skip:0,limit:12,sort:{time:-1}})
            .populate("user",{username:1,tx:1})
        return ctx.body={
            code: 0,
            msg: "请求成功",
            data
        }
    }catch (e) {
        console.log(e);
        return ctx.body = {
            code: 0,
            msg: "服务器出错，请稍后再试~",
            data: []
        }
    }
})

module.exports = router.routes()