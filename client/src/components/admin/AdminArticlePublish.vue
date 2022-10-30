<template>
  <div id="AdminArticlePublish">
    <h3>文章发表</h3>
    <el-form
      :model="form"
      ref="form"
      status-icon
      class="demo-ruleForm"
    >
      <el-form-item label="标题">
        <el-input
          type="text"
          v-model="form.title"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input
          type="text"
          v-model="form.des"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="md上传">
        <br>
        <el-upload
          class="md-upload"
          ref="mdUpload"
          name="md"
          :action="urlBase+'/admin/md'"
          :on-success="mdUploadSuccess"
          :file-list="mdFileList"
          :auto-upload="false">
          <el-button
            slot="trigger"
            size="small"
            type="primary"
          >选取文件</el-button>
          <el-button
            style="margin-left: 10px;"
            size="small"
            type="success"
            @click="submitMdUpload"
          >上传到服务器
          </el-button>
          <div slot="tip" class="el-upload__tip">请上传.md格式的文件</div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="submitForm('form')"
        >提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "AdminArticlePublish",
  data(){
    return {
      mdFileList: [],
      form: {
        title: "",
        des: "",
        src: ""
      }
    }
  },
  methods: {
    //文章发表
    async submitForm(formName){
      let {data} = await this.$axios({
        method: "post",
        url: "/admin/article",
        data: {
          title: this.form.title,
          des: this.form.des,
          src: this.form.src
        }
      })

      if (data.code !== 0){
        return
      }

      await this.$router.push('/article/' + data._id)

    },
    //点击md上传
    submitMdUpload(){
      this.$refs.mdUpload.submit()
    },
    //md上传成功的钩子
    mdUploadSuccess(res,file,fileList){
      console.log(res,file,fileList);
      if (res.code !== 0){
        return this.$message.error(res.msg)
      }
      this.$message.success("md上传成功")
      this.form.src = res.mdSrc
    }
  },
  mounted() {
  }
}
</script>

<style scoped>

</style>














