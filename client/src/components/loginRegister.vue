<template>
  <div id="loginRegister" @click="handleClose">

    <div class="content" @click.stop>
      <el-tabs v-model="activeName">
        <el-tab-pane label="立即登陆" name="login">
          <el-form
            :model="loginForm"
            status-icon
            :rules="rules"
            ref="loginForm"
            label-width="70px"
          >
            <el-form-item label="用户名" prop="username">
              <el-input type="text" v-model="loginForm.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="loginSubmit('loginForm')">登陆</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="注册账号" name="register">
          <el-form
            :model="registerForm"
            status-icon
            :rules="rules"
            ref="registerForm"
            label-width="80px"
          >
            <el-form-item label="用户名" prop="username">
              <el-input type="text" v-model="registerForm.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="registerForm.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="password2">
              <el-input type="password" v-model="registerForm.password2" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="registerSubmit('registerForm')">注册</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>

      <div class="close" @click="handleClose">×</div>
    </div>
  </div>
</template>

<script>
import {mapMutations} from "vuex";

export default {
  name: "loginRegister",
  data() {
    return {
      activeName: "register",
      loginForm: {
        username: "",
        password: ""
      },
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
        password: [{
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
        password2: [{
          validator: (rule, value, callback) => {
            if (value === this.registerForm.password) {
              callback()
            } else {
              callback("两次输入密码不一致")
            }
          },
          required: true,
          trigger: "blur"
        }]

      },
      registerForm: {
        username: "",
        password: "",
        password2: ""
      }
    }
  },
  methods: {
    //vuex
    ...mapMutations(['login']),
    handleClose() {
      this.$emit("close");
    },
    //注册
    registerSubmit(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          //验证通过
          let {data} = await this.$axios({
            method: "post",
            url: "/reg",
            data: {
              username: this.registerForm.username,
              password: this.registerForm.password
            }
          })
          //注册失败
          if (data.code !== 0) {
            //用户提示
            return this.$message.error(data.msg)
          }
          //注册成功
          this.activeName = 'login'
          return this.$message.success(data.msg)
        } else {
          //验证不通过
          return false
        }
      });
    },
    loginSubmit(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          //验证通过
          let {data} = await this.$axios({
            method: 'post',
            url: '/login',
            data:{
              username:this.loginForm.username,
              password:this.loginForm.password
            }
          })
          //登陆失败
          if (data.code !== 0){
            return this.$message({
              type: "error",
              duration: 1500,
              message: data.msg
            })
          }

          //登陆成功
          this.$message({
            type: "success",
            duration: 1500,
            message: "登陆成功"
          })
          this.handleClose()
          //更新vuex的数据
          this.login(data.data)
          console.log(data)
          console.log(data.data)
        }else{
          //验证不通过
          return false;
        }
      })
    },
    //弹窗关闭
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style scoped lang="less">
#loginRegister {
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);

  .content {
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 350px;
    padding: 0 15px;
    background-color: #fff;
    transform: translate(-50%, -50%);
  }

  .close {
    position: absolute;
    top: 10px;
    right: 10px;
    color: #aaa;
    font-size: 16px;
    cursor: pointer;
    user-select: none;

    &:hover {
      color: #555;
    }
  }
}
</style>