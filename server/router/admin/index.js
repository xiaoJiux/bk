const router = require('koa-router')()
const multer = require('@koa/multer')
const path = require('path')
const articleDB = require('../../db/article')

let mdStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../../public/article-public/md"))
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname.replace(/\.md$/, `-${Date.now()}.md`))
    }
})
//限制大小
let limit = {
    fields: 10,
    filesize: 10 * 1024 * 1024,
    files: 1
}


let mdUpload = multer({storage: mdStorage,limit:limit})
//判定是否为管理员
router.post('/',ctx =>{
    // console.log(ctx.session.userInfo.isAdmin);
    if(!ctx.session.userInfo || !ctx.session.userInfo.isAdmin){
        return ctx.body = {
            code:1,
            msg:"请以管理员身份登录!"
        }
    }

    ctx.body = {
        code:0,
        msg: "管理员身份登录成功!"
    }
})

//md上传
router.post("/md",mdUpload.single('md'),ctx =>{
    try{
        return ctx.body = {
            code:0,
            msg:"上传成功",
            mdSrc: `/article-public/md/${ctx.file.filename}`
        }
    }catch (err) {
        console.log(err);
        return ctx.body = {
            code:1,
            msg:'服务器错误,请稍后'
        }
    }
})

//文章发表
router.post("/article", async ctx => {
    //先看是不是管理员
    if (!ctx.session.userInfo || !ctx.session.userInfo.isAdmin) {
        return ctx.body = {
            code: 1,
            msg: "请先以管理员账号登录"
        }
    }

    const {title, des, src} = ctx.request.body

    try {
        //创建对应文章
        let result = await articleDB.create({
            title,des,src,author:ctx.session.userInfo._id
        })
        console.log(result);
        ctx.body = {
            code: 0,
            msg: "发表成功",
            _id: result._id
        }
    }catch (e) {

    }
})


module.exports =router.routes()