<template>
  <div class="category-list">
    <h1>文章列表</h1>
    <!-- 表格数据items，prop大概是items里对象的属性 -->
    <el-table :data="items">       
      <el-table-column prop="_id" label="ID" width="230">
      </el-table-column>
     
      <el-table-column prop="title" label="标题">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="180">
        <!-- scope.row当前行的文档 -->
        <template slot-scope="scope">
          <el-button type="primary"
                @click="$router.push(`/articles/edit/${scope.row._id}`)" 
                size="small">编辑</el-button>
          <el-button type="primary"
                @click="remove(scope.row)" 
                size="small">删除</el-button>
        </template>
      </el-table-column>       
    </el-table>
  </div>
</template>


<script>
export default {
  data() {
    return {
      items: []
    }
  },
  methods: {
    async fetch() {
      const res = await this.$http.get('/rest/articles')
      // res.data才是数据
      this.items = res.data
    },

    // 删除方法
    async remove(row) {      
      this.$confirm(`是否确定要删除该分类?"${row.title}"`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(async () => {
        const res = await this.$http.delete(`/rest/articles/${row._id}`)
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        // 删完之后要重新获取以下数据，不然页面不会变化
        this.fetch()
      })
    }
  },
  created() {
    this.fetch()
  }
}
</script>