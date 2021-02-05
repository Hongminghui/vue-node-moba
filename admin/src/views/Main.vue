<template>
  <el-container style="height: 100vh; ">
    <!-- 左侧导航 -->
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <!-- unique-opened：一次只能展开一个, 
            :default-active="$route.path: 默认高亮当前路径的导航 -->
            <!-- :default-opendes如果直接绑定['1'],
            点击第二个的内容，会将第二个菜单收起来，打开第一个菜单，
            绑定了一个变量，变量=['1']，这样就好了，点击谁，谁就是展开的 -->
      <el-menu router :default-openeds="currentIndex" unique-opened 
            :default-active="$route.path">
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-message"></i>内容管理</template>        
          <el-menu-item-group>
            <template slot="title">物品</template>
            <el-menu-item index="/items/create">新建物品</el-menu-item>
            <el-menu-item index="/items/list">物品列表</el-menu-item>
          </el-menu-item-group>          
          <el-menu-item-group>
            <template slot="title">英雄</template>
            <el-menu-item index="/heros/create">新建英雄</el-menu-item>
            <el-menu-item index="/heros/list">英雄列表</el-menu-item>
          </el-menu-item-group>          
          <el-menu-item-group>
            <template slot="title">文章</template>
            <el-menu-item index="/articles/create">新建文章</el-menu-item>
            <el-menu-item index="/articles/list">文章列表</el-menu-item>
          </el-menu-item-group>                    
        </el-submenu>
        <el-submenu index="2">
          <template slot="title"><i class="el-icon-message"></i>运营管理</template>  
          <el-menu-item-group>
            <template slot="title">广告位</template>
            <el-menu-item>新建广告位</el-menu-item>
          <el-menu-item>广告位列表</el-menu-item>
          </el-menu-item-group>                
        </el-submenu>
        <el-submenu index="3">
          <template slot="title"><i class="el-icon-message"></i>系统设置</template>
          <el-menu-item-group>
            <template slot="title">分类</template>
            <el-menu-item index="/categories/create">新建分类</el-menu-item>
            <el-menu-item index="/categories/list">分类列表</el-menu-item>
          </el-menu-item-group>                         
          <el-menu-item-group>
            <template slot="title">管理员</template>
            <el-menu-item index="/admin_users/create">新建管理员</el-menu-item>
            <el-menu-item index="/admin_users/list">管理员列表</el-menu-item>
          </el-menu-item-group>                         
        </el-submenu>
      </el-menu>
    </el-aside>
    
    <el-container>
      <!-- 头部 -->
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>王小虎</span>
      </el-header>
      
      <el-main>
        <!-- 主体内容 -->
        <router-view></router-view>
        
      </el-main>
    </el-container>
  </el-container>
</template>
<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>

<script>
  export default {
    data() {
      const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      };
      return {
        currentIndex: ['1'],
        tableData: Array(20).fill(item)
      }
    }
  };
</script>