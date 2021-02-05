<template>
  <div class="category-edit">
    <h1>{{id  ? '编辑' : '新建'}}英雄</h1>
    <!-- 点击保存时，执行save方法，.native监听原生组件，.prevent阻止表单默认行为，
          不会跳转页面 -->
    <el-form label-width="120px" @submit.native.prevent="save">
      <!-- el-tabs相当于给编辑部分分页，因为太多了，value默认选中和name值相同的 -->
      <el-tabs value="skills" type="border-card">
        <!-- 点击基本信息，下面这部分就出来了 -->
        <el-tab-pane label="基本信息" name="">
          <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="称号">
            <el-input v-model="model.title"></el-input>
          </el-form-item>
          <el-form-item label="头像">
            <!-- 修改了action：提交的地址 -->
            <!-- 修改了on-success：成功的回调 -->
            <!-- 删掉了上传前的回调，简便处理 -->
            <el-upload
              class="avatar-uploader"
              :action="$http.defaults.baseURL + '/upload'"
              :show-file-list="false"
              :on-success="afterUpload"
              :headers="getAuthHeaders()"
              >
              <!-- 图片地址绑定数据库中的avatar -->
              <img v-if="model.avatar" :src="model.avatar" class="avatar">
              <!-- 上传图标，有图片就显示图片，没图片就上传 -->
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="model.categories" multiple>
              <el-option v-for="item of categories"
              :label="item.name" :value="item._id" :key="item._id"></el-option>
            </el-select>
          </el-form-item>
          <!-- 四组评分，都是scores这个字段的字段 -->
          <el-form-item label="难度">
            <!-- data中的model必须初始化scores属性为{}，不然这里会报错 -->
            <el-rate :max="9" show-score style="margin-top: 0.6rem" 
                  v-model="model.scores.difficult"></el-rate>
          </el-form-item>
          <el-form-item label="技能">
            <el-rate :max="9" show-score style="margin-top: 0.6rem" 
                  v-model="model.scores.skills"></el-rate>
          </el-form-item>
          <el-form-item label="攻击">
            <el-rate :max="9" show-score style="margin-top: 0.6rem" 
                  v-model="model.scores.attack"></el-rate>
          </el-form-item>
          <el-form-item label="生存">
            <el-rate :max="9" show-score style="margin-top: 0.6rem" 
                  v-model="model.scores.survive"></el-rate>
          </el-form-item>
          <el-form-item label="顺风出装">
            <el-select v-model="model.items1" multiple>
              <el-option v-for="item of items"
              :label="item.name" :value="item._id" :key="item._id"></el-option>
            </el-select>
          </el-form-item>
          <!-- 绑定的字段不一样，但是选项一样，都是装备列表 -->
          <el-form-item label="逆风出装">
            <el-select v-model="model.items2" multiple>
              <el-option v-for="item of items"
              :label="item.name" :value="item._id" :key="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用技巧">
            <el-input type="textarea" v-model="model.usageTips"></el-input>
          </el-form-item>
          <el-form-item label="对抗技巧">
            <el-input type="textarea" v-model="model.battleTips"></el-input>
          </el-form-item>
          <el-form-item label="团战思路">
            <el-input type="textarea" v-model="model.teamTips"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="技能" name="skills">
          <!-- 每次点击给model.skills里添加一个对象 -->
          <!-- <el-button type="text" @click="model.skills.push({})"> 
            <i class="el-icon-plus"></i> 添加技能</el-button> -->
          <el-button type="primary" size="small" @click="model.skills.push({})"> 
                  添加技能</el-button>
            <!-- 响应式布局，点击按钮，就会多一列，并且每一列会缩小 -->
          <el-row type="flex" style="flex-wrap: wrap">
            <!-- 一行有两个技能，随着添加按钮的点击，el-col循环展示 -->
            <!-- md可能是中等尺寸屏幕的意思 -->
            <el-col :md="12" v-for="(item, i) in model.skills" :key="i">
              <!-- 每一个技能有四项内容，所以有四个form-item -->
              <el-form-item label="名称">
                <!-- 每一个输入框绑定的值，对应后端模型中skills字段的值 -->
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="图标">
                <el-upload
                  class="avatar-uploader"
                  :action="$http.defaults.baseURL + '/upload'"
                  :show-file-list="false"
                  :on-success="res => $set(item, 'icon', res.url)"
                  >
                  <!-- item指技能，res就是返回的结果，res.url是图片的地址 -->
                  <img v-if="item.icon" :src="item.icon" class="avatar">
                  <!-- 上传图标，有图片就显示图片，没图片就上传 -->
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="描述" >
                <el-input type="textarea" v-model="item.description"></el-input>
              </el-form-item>
              <el-form-item label="小提示" >
                <el-input type="textarea" v-model="item.tips"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button size="small" type="danger" 
                @click="model.skills.splice(i, 1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <el-form-item style="margin-top: 1rem">
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
      // 英雄分类
      categories: [],
      // 装备列表
      items: [],
      model: {
        name: '',
        avatar: '',
        scores: {
          difficult: 0
        },
        skills: []
      },
    }
  },
  methods: {
    /* post请求，提交到heros，req.body可能就是this.model，提交完就跳转到list界面 */
    // axios的baseURL: 'http://localhost:3000/admin/api'
    // 图片上传成功的回调
    afterUpload(res) {
      // 属性存在的时候，这个就是响应式的
      this.model.avatar = res.url
    },
    async save() {
      let res 
      if(this.id) {
        res = await this.$http.put(`/rest/heros/${this.id}`, this.model)
      }else {
        res = await this.$http.post('/rest/heros', this.model)
      }
      this.$router.push('/heros/list')
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    },
    // 获取详情页数据
    async fetch() {
      const res = await this.$http.get(`/rest/heros/${this.id}`)
      // 覆盖赋值
      // this.model = res.data   
      // 合并对象，属性为三者之和，属性值后出现的优先
      this.model = Object.assign({}, this.model, res.data)
    },
    // 获取分类信息
    async fetchCategories() {
      const res = await this.$http.get(`/rest/categories`)
      this.categories = res.data   
    },
    // 获取装备数据
    async fetchItems() {
      const res = await this.$http.get(`/rest/items`)
      this.items = res.data   
    },    
  },
  created() {
    // 有id的时候就去获取
    this.id && this.fetch()
    this.id && this.fetchCategories()
    this.id && this.fetchItems()
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
    width: 5rem;
    height: 5rem;
    line-height: 5rem;
    text-align: center;
  }
  .avatar {
    width: 5rem;
    height: 5rem;
    display: block;
  }
  /* 上传图标的加号，刷新后会到顶部去，手动调整使其居中 */
  /* .el-icon-plus:before {
    height: 30px;
    content: "\e6d9";
    width: 30px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  } */
</style>
