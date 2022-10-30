const router = require('koa-router')()
const path = require("path")
const userDB = require("../../db/user")
const multer = require('@koa/multer');//引入

const storage = multer.diskStorage({ // multer调用diskStorage可控制磁盘存储引擎
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../../public/tx"))
    },
    filename: function (req, file, cb) {
        // cb(null, file.fieldname + '-' + Date.now()) // 文件名使用cb回调更改，参数二是文件名，为了保证命名不重复，使用时间戳
        let typeIndex = [
            "image/gif", "image/jpeg", "image/png"
        ].indexOf(file.mimetype)

        if (typeIndex === -1) {
            cb(new Error("文件格式不正确"))
            return
        }
        let ext = [".gif", ".jpg", ".png"][typeIndex]
        cb(null, file.fieldname + '-' + Date.now() + ext)
    }
})

const limits = {
    fields: 10,
    filesize: 2 * 1024 * 1024,
    files: 1
}
let upload = multer({
    storage: storage, limits: limits
})

// 上传头像

router.post('/tx', upload.single('avatar'), async ctx => {
    // ctx.files 可获取到上传的所有文件信息，type -> Array
    if (!ctx.session.userInfo) {
        return ctx.body = {
            code: 1,
            msg: '请先登录'
        }
    }
    try {
        //没有错误,上传完成
        let _id = ctx.session.userInfo._id
        //修改数据库数据
        let tx = '/tx/' + ctx.file.filename
        // console.log(tx);
        await userDB.updateOne({_id}, {tx})

        //修改session
        ctx.session.userInfo.tx = tx

        return ctx.body = {
            code: 0,
            msg: '头像上传成功'
        }
    } catch (err) {
        console.log(err);
        return ctx.body = {
            code: 4,
            msg: "服务器错误，请稍后再试"
        }
    }
})


module.exports = router.routes()
