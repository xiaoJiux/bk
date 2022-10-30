<template>
  <div id="AppNav">
    <div class="content">
      <!--logo-->
      <div class="logo">
        <a href="/">flycat.cn</a>
      </div>
      <!--导航-->
      <div class="nav">
        <router-link to="/">首页</router-link>
        <router-link to="/article">文章</router-link>
        <router-link to="/message">留言</router-link>
        <router-link to="/daily">足迹</router-link>
        <router-link to="/Link">友链</router-link>
        <router-link to="/about">关于</router-link>
      </div>
      <!--登陆注册-->
      <userTx v-if="userInfo._id"></userTx>
      <div v-else class="user" >
        <el-button
          @click = "handleLogin"
          class="loginRegister" type="success" size="mini">登录/注册</el-button>
      </div>
    </div>
    <loginRegister
      @close = "handleClose"
      v-show = "isShowLogin"
    ></loginRegister>
  </div>
</template>

<script>
import loginRegister from "@/components/loginRegister";
import userTx from '@/components/userTx'
import {mapState} from "vuex";

export default {
  name: "AppNav",
  components:{loginRegister,userTx},
  data(){
    return {
      isShowLogin:false
    }
  },
  computed:{
    ...mapState(['userInfo'])
  },
  methods: {
    handleLogin() {
      this.isShowLogin = true
    },
    handleClose() {
      this.isShowLogin = false;
    }
  }
}
</script>

<style lang="less" scoped>
#AppNav{
  width: 100%;
  height: 50px;
  background-color: #fff;
  box-shadow: 0 0 2px #999;

  .content{
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    max-width: 1300px;
    padding: 0 15px;
    //background-color: pink;
    margin: 0 auto;

    /*logo*/
    .logo{
      width: 130px;
      height: 50px;
      a{
        display: block;
        width: 100%;
        height: 100%;
        line-height: 42px;
        font-size: 26px;
        letter-spacing: 5px;
        font-family: "Pacifico","serif";
        color: rgba(0,0,0,.7);
      }
    }

    /*导航*/
    .nav{
      width: 470px;
      height: 50px;
      //background-color: aquamarine;
      a{
        float: left;
        display: block;
        height: 98%;
        border-bottom: 2px solid transparent;
        padding: 0 25px;
        color: #777;
        line-height: 48px;
        font-weight: bolder;
        transition: all .3s;

        &.router-link-exact-active{
          color: #00b7ff;
          border-color: #00b7ff;
        }

        &:hover{
          color: #00b7ff;
        }
      }

    }

    /*登陆与注册*/
    .user{

      height: 50px;
      //background-color: antiquewhite;
      .el-button{
        display: block;
        margin-top: 11px;
      }
      .login{
        float: left;
      }
      .register{
        float: right;
      }
    }
  }

}



</style>














