<template>
  <div class="category-list">
    <h1>管理员列表</h1>
    <!-- 表格数据items，prop大概是items里对象的属性 -->
    <el-table :data="items">       
      <el-table-column prop="_id" label="ID" width="230"></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="180">
        <!-- scope.row当前行的文档 -->
        <template slot-scope="scope">
          <el-button type="primary"
                @click="$router.push(`/admin_users/edit/${scope.row._id}`)" 
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
      const res = await this.$http.get('/rest/admin_users')
      // res.data才是数据
      this.items = res.data
    },

    // 删除方法
    async remove(row) {      
      this.$confirm(`是否确定要删除"${row.username}"`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(async () => {
        const res = await this.$http.delete(`/rest/admin_users/${row._id}`)
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