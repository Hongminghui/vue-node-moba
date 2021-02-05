<template>
  <div class="category-edit">
    <h1>{{id  ? '编辑' : '新建'}}文章</h1>
    <!-- 点击保存时，执行save方法，.native监听原生组件，.prevent阻止表单默认行为，
          不会跳转页面 -->
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="所属分类">
        <!-- 文章的下拉框绑定categories字段，一篇文章可能有多个分类 -->
        <el-select v-model="model.categories" multiple>
          <!-- 下拉选项的标签（显示的内容）是文档的名字，真正存的值是id -->
          <el-option v-for="item in categories" :key="item._id" 
          :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="详情">
        <vue-editor useCustomImageHandler @imageAdded="handleImageAdded" 
              v-model="model.body"></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'
export default {

  // 使用VueEditor
  components: {
    VueEditor
  },
  // 可以获得路由的params参数
  props: {
    id: {}
  },
  data() {
    return {
      // model.categoires是数据库中，这篇文章的所属分类
      // categories是所有存在的分类
      model: {},
      // 文章的分类
      categories: []
    }
  },
  methods: {
    /* post请求，提交到articles，req.body可能就是this.model，提交完就跳转到list界面 */
    // axios的baseURL: 'http://localhost:3000/admin/api'
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      // 表单数据，将键改为file，和网络请求（浏览器可查看）的Form Data中键名一样
      var formData = new FormData();
      formData.append("file", file);

      const res = await this.$http.post('upload', formData)
      // 大概是光标位置嵌入一张图片
      Editor.insertEmbed(cursorLocation, "image", res.url);
      resetUploader();
    },
    async save() {
      let res 
      if(this.id) {
        res = await this.$http.put(`/rest/articles/${this.id}`, this.model)
      }else {
        res = await this.$http.post('/rest/articles', this.model)
      }
      this.$router.push('/articles/list')
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    },
    // 获取详情页数据
    async fetch() {
      const res = await this.$http.get(`/rest/articles/${this.id}`)
      this.model = res.data   
    },
    // 获取所属分类的名称
    async fetchCategories() {
      const res = await this.$http.get(`/rest/categories`)
      this.categories = res.data
    }
  },
  created() {
    // 有id的时候就去获取
    this.id && this.fetch()
    this.fetchCategories()
  }
  
}
</script>  
