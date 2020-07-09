<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="~assets/img/logo.png"
             alt="">
      </div>
      <el-form :model="ruleForm"
               :rules="rules"
               ref="ruleFormRef"
               class="login_form">
        <el-form-item prop="username">
          <el-input prefix-icon="iconfont icon-user"
                    v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password"
                    prefix-icon="iconfont icon-3702mima"
                    v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary"
                     @click="userLogin">登录</el-button>
          <el-button type="info"
                     @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { loginRequest } from 'network/loginReq'

export default {
  methods: {
    userLogin() {
      this.$refs.ruleFormRef.validate(valid => {
        // 密码错误
        if (!valid) return
        // 密码正确
        loginRequest(this.ruleForm).then(res => {
          // 获取状态码
          const status = res.data.meta.status
          if (status !== 200) {
            return this.$message({
              duration: 1000,
              message: '登录失败',
              type: 'error'
            })
          }
          this.$message.success('登录成功')
          window.sessionStorage.setItem('token', res.data.data.token)
          this.$router.push('/home')
        })
      })
    },
    resetForm() {
      this.$refs.ruleFormRef.resetFields()
    }
  },
  data() {
    return {
      ruleForm: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入用户', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  }
}
</script>

<style scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
  position: relative;
}
.login_container .login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 10px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.avatar_box {
  width: 130px;
  height: 130px;
  border-radius: 50%;
  position: absolute;
  left: 50%;
  padding: 10px;
  transform: translate(-50%, -50%);
  background-color: #fff;
  text-align: center;
  box-shadow: 0 0 10px #ddd;
  box-sizing: border-box;
}
.login_box img {
  height: 100%;
  width: 100%;
  border-radius: 55px;
}
.login_form {
  position: absolute;
  bottom: 0px;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.login_form .btns {
  float: right;
}
</style>
