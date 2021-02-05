<template>
  <div class="category-edit">
    <h1>{{id  ? '编辑' : '新建'}}物品</h1>
    <!-- 点击保存时，执行save方法，.native监听原生组件，.prevent阻止表单默认行为，
          不会跳转页面 -->
    <el-form label-width="120px" @submit.native.prevent="save">
      
      <el-form-item label="名称">
        <!-- 双向绑定数据，model指文档 -->
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <!-- 修改了action：提交的地址 -->
        <!-- 修改了on-success：成功的回调 -->
        <!-- 删掉了上传前的回调，简便处理 -->
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :show-file-list="false"
          :on-success="afterUpload"
          :headers="getAuthHeaders()"
          >
          <!-- 图片地址绑定数据库中的icon -->
          <img v-if="model.icon" :src="model.icon" class="avatar">
          <!-- 上传图标，有图片就显示图片，没图片就上传 -->
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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
    /* post请求，提交到items，req.body可能就是this.model，提交完就跳转到list界面 */
    // axios的baseURL: 'http://localhost:3000/admin/api'
    // 图片上传成功的回调
    afterUpload(res) {
      // res.url就是图片地址
      // this.model.icon = res.url
      // vue中的响应式实现，参数为：对象，属性，属性值
      this.$set(this.model, 'icon', res.url)
    },
    async save() {
      let res 
      if(this.id) {
        res = await this.$http.put(`/rest/items/${this.id}`, this.model)
      }else {
        res = await this.$http.post('/rest/items', this.model)
      }
      this.$router.push('/items/list')
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    },
    // 获取详情页数据
    async fetch() {
      const res = await this.$http.get(`/rest/items/${this.id}`)
      this.model = res.data   
    },
    
  },
  created() {
    // 有id的时候就去获取
    this.id && this.fetch()
  }
  
}
</script>


<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  /* 上传图标的加号，刷新后会到顶部去，手动调整使其居中 */
  .el-icon-plus:before {
    height: 30px;
    content: "\e6d9";
    width: 30px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
