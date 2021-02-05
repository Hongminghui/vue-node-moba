<template>
  <div class="category-edit">
    <h1>{{id  ? '编辑' : '新建'}}分类</h1>
    <!-- 点击保存时，执行save方法，.native监听原生组件，.prevent阻止表单默认行为，
          不会跳转页面 -->
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="上级分类">
        <!-- 与数据库中的parent绑定 -->
        <el-select v-model="model.parent">
          <!-- 下拉选项的标签（显示的内容）是文档的名字，真正存的值是id -->
          <el-option v-for="item in parents" :key="item._id" 
          :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <!-- 双向绑定数据，model指文档 -->
        <el-input v-model="model.name"></el-input>
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
      parents: []
    }
  },
  methods: {
    /* post请求，提交到categories，req.body可能就是this.model，提交完就跳转到list界面 */
    // axios的baseURL: 'http://localhost:3000/admin/api'

    async save() {
      let res 
      if(this.id) {
        res = await this.$http.put(`/rest/categories/${this.id}`, this.model)
      }else {
        res = await this.$http.post('/rest/categories', this.model)
      }
      this.$router.push('/categories/list')
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    },
    // 获取详情页数据
    async fetch() {
      const res = await this.$http.get(`/rest/categories/${this.id}`)
      this.model = res.data   
    },
    // 获取父级分类的名称
    async fetchParents() {
      const res = await this.$http.get(`/rest/categories`)
      this.parents = res.data
    }
  },
  created() {
    // 有id的时候就去获取
    this.id && this.fetch()
    this.fetchParents()
  }
  
}
</script>  
