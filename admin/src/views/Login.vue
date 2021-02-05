<template>
  <div class="login-container">
    <el-card header="请先登录" class="login-card">
      <el-form @submit.native.prevent="login">
        <el-form-item label="用户名">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="model.password"></el-input>
        </el-form-item>
        <el-form-item>
          <!-- 提交按钮 -->
          <el-button native-type="submit" type="primary">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>


export default {
  name: 'Login',
  data() {
    return {
      model: {}
    }
  },
  methods: {
    async login() {
      const res = await this.$http.post('login', this.model)
      // 把token存在localStorage，永久存储
      localStorage.token = res.data.token
      // 存在sessionStorage中，浏览器关闭就没了
      // sessionStorage.token = res.data.token
      this.$router.push('/')
      // 弹出登录成功
      this.$message({
        type: 'success',
        message: '登录成功'
      })
    }
  }
}
</script>

<style>
  .login-card {
    width: 25rem;
    margin: 5rem auto;
  }
</style>
