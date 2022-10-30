<template>
<div id="Admin">
  <div class="no" v-if="!isAdmin">
    您所登录的不是管理员账号，<router-link to="/">返回首页</router-link>
  </div>
  <div class="yes" v-else>
    <el-tabs tab-position="top">
      <el-tab-pane label="文章管理">
      </el-tab-pane>
      <el-tab-pane label="文章发表">
        <AdminArticlePublish></AdminArticlePublish>
      </el-tab-pane>
      <el-tab-pane label="添加友链">

      </el-tab-pane>
      <el-tab-pane label="管理友链">

      </el-tab-pane>
    </el-tabs>
  </div>
</div>
</template>

<script>
import AdminArticlePublish from "@/components/admin/AdminArticlePublish";

export default {
  name: "Admin",
  components:{AdminArticlePublish},
  data(){
    return {
      isAdmin: false,
    }
  },
  async created(){
    let {data} = await this.$axios({
      method:"post",
      url:'admin'
    })
    this.isAdmin = data.code === 0
  }
}
</script>

<style scoped lang="less">
.yes{
  background-color: #fff;
  padding: 20px;
}
</style>