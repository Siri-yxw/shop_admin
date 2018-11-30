<template>
  <el-row justify="center" align="middle" type="flex" class="login">
    <el-col :xs="16" :sm="14" :md="12" :lg="10" :xl="8">
      <el-form :model="lginForm" :rules="rules" ref="lginForm" label-width="100px" class="demo-lginForm" label-position="top">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="lginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="lginForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('lginForm')">立即创建</el-button>
          <el-button @click="resetForm('lginForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>

</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      lginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) {
          return false
        }
        axios
          .post('http://localhost:8888/api/private/v1/login', this.lginForm)
          .then(res => {
            console.log(res)
            if (res.data.meta.status === 200) {
              // 登录成功,存token,跳转
              this.$message({
                message: '登录成功',
                type: 'success',
                duration: 1000
              })
              localStorage.setItem('token', res.data.data.token)
              // 编程式导航(js代码跳转)
              this.$router.push('/home')
            } else {
              // 登录失败
              this.$message({
                message: res.data.meta.msg,
                type: 'error',
                duration: 1000
              })
            }
          })
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style>
.demo-lginForm {
  background-color: #fff;
  border-radius: 15px;
  padding: 20px;
}
.login {
  height: 100%;
  background-color: #abc;
}
</style>
