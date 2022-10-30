<template>
  <article class="Connect">
    <h2>CONTACT ME</h2>
    <p class="des">有任何问题请联系我吧，收到消息后会给您回复邮件的哦♪(^∇^*)</p>
    <el-radio-group v-model="labelPosition" size="small"></el-radio-group>

    <el-form :label-position="labelPosition" :rules="rules" ref="ruleForm" label-width="100px" :model="ruleForm">
      <el-form-item label="Your Name" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="Your email" prop="email">
        <el-input v-model="ruleForm.email"></el-input>
      </el-form-item>
      <el-form-item label="Subject" prop="sbj">
        <el-input v-model="ruleForm.sbj"></el-input>
      </el-form-item>
      <el-form-item label="Your Message" prop="msg">
        <el-input v-model="ruleForm.msg"></el-input>
      </el-form-item>
      <el-form-item style="padding-top: 15px">
        <el-button type="primary" @click="submitForm('ruleForm')">Send</el-button>
        <el-button @click="resetForm('ruleForm')">Reset</el-button>
      </el-form-item>
    </el-form>
  </article>
</template>

<script>
export default {
  name: "Connect",
  data() {
    return {
      labelPosition: 'top',
      ruleForm: {
        name: '',
        email: '',
        sbj: '',
        msg:''
      },
      rules:{
        name: [
          { required: true, message: '请输入您的用户名', trigger: 'blur' },
          { min: 3, max: 7, message: '长度在 3 到 7 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入您的Email',trigger:'blur' },
          { type: 'email', message:'请输入正确的Email地址',trigger: 'blur' }
        ],
        sbj: [
          { required: true, message: '请输入标题', trigger: 'blur'}
        ],
        msg: [
          { required: true, message: '请输入标题', trigger: 'blur'},
          { min: 5, max: 30,message: '请输入5-30个字符',trigger: 'blur'}
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style scoped lang="less">
.el-form{
  padding: 0 40px;

  .el-button:nth-child(1) {
    border-radius: 25px;
    background-color: rgb(191,226,230);
  }
  .el-button:nth-child(2) {
    margin-left: 40px;
    border-radius: 25px;
    background-color: #5db92e;
  }
}

</style>