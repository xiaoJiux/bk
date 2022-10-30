<template>
  <div id="UserInfo">
    <article class="notLogin" v-if="userInfo._id === ''">
      <h2>温馨提示</h2>
      <p>您暂时还未登录,请登录后再尝试!!!
        <router-link to="/">点击返回首页</router-link>
      </p>
    </article>
    <article v-else class="setting">
      <el-tabs tab-position="left" style="min-height: 200px">
        <el-tab-pane label="账户信息">
          <div class="userTx">
            <span>用户头像</span>
            <div class="img"
                 :style="{
            backgroundImage: `url(${urlBase}${userInfo.tx})`
            }"
            ></div>
          </div>
          <el-descriptions :column="1" :labelStyle="labelStyle" :contentStyle="labelStyle">
            <el-descriptions-item label="用户名">{{ userInfo.username }}</el-descriptions-item>
            <el-descriptions-item label="邮箱">{{ userInfo.email === undefined ? '暂时还未绑定邮箱' : userInfo.email }}
            </el-descriptions-item>
            <el-descriptions-item label="注册时间">{{ userInfo.regTime | fmtTime }}</el-descriptions-item>
          </el-descriptions>
        </el-tab-pane>
        <el-tab-pane label="更改头像">
          <el-upload
            class="avatar-uploader"
            name="avatar"
            :action="urlBase+'/upload/tx'"
            :show-file-list="false"
            :with-credentials="true"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
        <el-tab-pane label="更改用户名">
          <el-form :model="nameForm" status-icon :rules="rules" ref="nameForm" label-width="100px"
                   class="demo-ruleForm">
            <p class="username">用户名: <span>{{ userInfo.username }}</span></p>
            <el-form-item label="新用户名" prop="newName">
              <el-input type="text" v-model="nameForm.newName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitName('nameForm')">提交</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="更改密码">
          <el-form :model="passForm" status-icon :rules="rules" ref="passForm" label-width="100px"
                   class="demo-ruleForm">
            <el-form-item label="旧密码" prop="oldPass">
              <el-input type="password" v-model="passForm.oldPass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newPass">
              <el-input type="password" v-model="passForm.newPass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="newPass2">
              <el-input type="password" v-model="passForm.newPass2" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitPass('passForm')">提交</el-button>
              <el-button @click="resetPass('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </article>
  </div>
</template>

<script>
import {mapMutations, mapState} from "vuex";

export default {
  name: "UserInfo",
  computed: {
    ...mapState(['userInfo'])
  },
  data() {
    return {
      urlBase: process.env.NODE_ENV === "development" ? "http://localhost:3000" : "",
      labelStyle: {
        "font-size": '18px',
        "margin-bottom": '10px'
      },
      //改密码
      passForm: {
        oldPass: "",
        newPass: "",
        newPass2: "",
      },
      nameForm: {
        newName: ""
      },
      imageUrl: '',
      rules: {
        /*用户名规则*/
        username: [{
          validator(rule, value, callback) {
            if (/^[\w\u4e00-\u9fa5]{2,8}$/.test(value)) {
              callback()
            } else {
              callback(new Error("用户名不满足规则"))
            }
          },
          required: true,
          trigger: "blur"
        }],
        /*密码规则*/
        newPass: [{
          validator(rule, value, callback) {
            if (/^[\w\[\]\/\\\-!@#$%^&*()+=|,.<>?:;"'{}]{6,18}$/.test(value)) {
              callback()
            } else {
              callback(new Error("密码不满足规则"))
            }
          },
          required: true,
          trigger: "blur"
        }],

        /*再次输入密码规则*/
        newPass2: [{
          validator: (rule, value, callback) => {
            if (value === this.passForm.newPass) {
              callback()
            } else {
              callback("两次输入密码不一致")
            }
          },
          required: true,
          trigger: "blur"
        }],
        /*密码规则*/
        oldPass: [{
          validator(rule, value, callback) {
            if (/^[\w\[\]\/\\\-!@#$%^&*()+=|,.<>?:;"'{}]{6,18}$/.test(value)) {
              callback()
            } else {
              callback(new Error("密码不满足规则"))
            }
          },
          required: true,
          trigger: "blur"
        }],

      }

    }
  },

  methods: {
    ...mapMutations(['logout']),

    //改密码
    submitPass(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let {data} = await this.$axios({
            method: 'post',
            url: '/update/pass',
            data: {
              oldpassword: this.passForm.oldPass,//旧密码
              newpassword: this.passForm.newPass,//新密码
              _id: this.userInfo._id
            }
          })
          console.log(data);
          //成功之后登出
          this.logout()
        }


      });
    },
    //改昵称
    submitName(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let {data} = await this.$axios({
            method: 'post',
            url: '/update/name',
            data: {
              newName: this.nameForm.newName
            }
          })
          if (data.code !== 0) {
            return this.$message.error(data.msg)
          }

          this.$message({
            type: "success",
            duration: 1000,
            message: "更新成功",
            onClose() {
              window.location.reload()
            }
          })
        } else {
          return false
        }
      });
    },
    //头像提交
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.$message({
        type: "success",
        message: "上传成功",
        duration: 1000,
        onClose(){
          window.location.reload()
        }
      })
    },
    beforeAvatarUpload(file) {
      //是否是图片格式
      let isImage = /^image\/(gif|jpeg|png)$/.test(file.type)
      //是否小于2M
      let isLt2M = file.size / 1024 / 1024 < 2;
      if (!isImage) {
        this.$message.error('上传头像必须是jpg/png/gif图片');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isImage && isLt2M
    },
    resetPass(formName) {
      this.$refs[formName].resetFields();
    }
  },

}
</script>

<style scoped lang="less">
#UserInfo {

  article {
    background-color: #fff;
    padding: 15px;
    margin-bottom: 15px;

    &.setting {

      .userTx {
        padding: 8px 25px;

        span {
          font-size: 20px;
        }

        .img {
          width: 65px;
          height: 65px;
          border-radius: 100%;
          background-size: cover;
          margin-top: 15px;
        }
      }

      .el-descriptions {
        padding: 10px 25px;
      }


      .username {
        padding: 20px 36px;

        span {
          padding-left: 15px;
        }
      }
    }

    &.notLogin {
      h2 {
        border-left: 8px solid #8ed2dc;
        padding-left: 10px;
      }

      p {
        padding: 20px;
        letter-spacing: 3px;

        a {
          color: #c0b8b8;
        }
      }
    }
  }
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
