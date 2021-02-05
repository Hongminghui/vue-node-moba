<template>
  <div class="category-edit">
    <h1>{{id  ? '编辑' : '新建'}}管理员</h1>
    <!-- 点击保存时，执行save方法，.native监听原生组件，.prevent阻止表单默认行为，
          不会跳转页面 -->
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <!-- 双向绑定数据，model指文档 -->
        <el-input v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <!-- 密码框 -->
        <el-input v-model="model.password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  // 可以获得路由的params参数
  props: {
    id: {}
  },
  data() {
    return {
      model: {},
    }
  },
  methods: {
    /* post请求，提交到admin_users，req.body可能就是this.model，提交完就跳转到list界面 */
    // axios的baseURL: 'http://localhost:3000/admin/api'

    async save() {
      let res 
      if(this.id) {
        res = await this.$http.put(`/rest/admin_users/${this.id}`, this.model)
      }else {
        res = await this.$http.post('/rest/admin_users', this.model)
      }
      this.$router.push('/admin_users/list')
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    },
    // 获取详情页数据
    async fetch() {
      const res = await this.$http.get(`/rest/admin_users/${this.id}`)
      this.model = res.data   
    },
  },
  created() {
    // 有id的时候就去获取
    this.id && this.fetch()
  }
  
}
</script>  
