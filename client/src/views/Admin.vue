<template>
  <div id="Admin">
    <div v-if="!isAdmin" class="no">
      您所登录的不是管理员账号，
      <router-link to="/">返回首页</router-link>
    </div>
    <div v-else class="yes">
      <el-tabs tab-position="top">
        <el-tab-pane label="文章管理">
          <AdminArticle/>
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
import AdminArticle from "@/components/admin/AdminArticle";

export default {
  name: "Admin",
  components: { AdminArticle, AdminArticlePublish, },
  data () {
    return {
      isAdmin: false,
    }
  },
  async created () {
    let { data } = await this.$axios ({
      method: "post",
      url: 'admin'
    })
    this.isAdmin = data.code === 0
  }
}
</script>

<style lang="less" scoped>
.yes {
  background-color: #fff;
  padding: 20px;
}
</style>
