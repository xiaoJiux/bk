<template>
  <div id="userTx">
    <el-popover
      placement="bottom"
      class="Face-popover"
      trigger="hover">
      <!--默认显示出来的-->
      <div
        slot="reference"
        class="img"
        :title="userInfo.username"
        :style="{
          backgroundImage: `url(${urlBase}${userInfo.tx})`
        }"
      ></div>
      <!--hover之后显示的-->
      <div class="list">
        <el-button
          type="primary"
          size="mini"
          @click="handleUserUpdate"
        >修改信息</el-button>
      </div>
      <div class="list">
        <el-button
          type="danger"
          size="mini"
          @click="logout"
          style="margin-top: 3px"
        >退出登录</el-button>
      </div>
    </el-popover>

  </div>
</template>

<script>
import {mapState} from "vuex";
import {mapMutations} from "vuex";

export default {
  name: "userTx",
  data() {
    return {
      urlBase: process.env.NODE_ENV === "development"?"http://localhost:3000":""
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    ...mapMutations(['logout']),
    handleUserUpdate(){
      window.open("/userinfo")
    }
  }
}
</script>

<style scoped lang="less">
#userTx{
  position: relative;
  top: 8px;
  overflow: hidden;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  box-shadow: 0 0 5px #555;
  cursor: pointer;
  .img{
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
  }

}
</style>