const router = require('koa-router')()

//注册路由
router.use('/reg',require('./register/index'))

//登录路由
router.use('/login',require('./login/index'))

//上传头像/文件路由
router.use('/upload',require('./upload/index'))

//更新路由
router.use('/update',require('./update/index'))

//留言路由
router.use('/msg',require('./msg/index'))

//访客路由
router.use('/visit',require('./visit/index'))

//管理员路由
router.use('/admin',require('./admin/index'))

//文章路由
router.use("/art", require("./art/index"))

module.exports = router