<template>
  <div class="users-container">
    <!-- 面包屑 -->
    <el-breadcrumb class="my-bread" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--输入框 -->
    <el-row>
      <el-col :span="6">
        <el-input placeholder="请输入内容" v-model="sendData.query" @keyup.native.enter="search" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="12">
        <el-button type="success" plain>添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table :data="userList" style="width: 100%" border>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column prop="mg_state" label="用户状态">
        <!-- scope 是一个名字 -->
        <template slot-scope="scope">
          <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <!-- scope 是一个名字 -->
        <template slot-scope="scope">
          <!-- 我们可以通过scope.$index 获取索引 scope.row获取这一行的数据 -->
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-edit"
            @click="handleEdit(scope.$index, scope.row)"
            plain
          ></el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete" plain></el-button>
          <el-button type="warning" size="mini" icon="el-icon-check" plain></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      :page-sizes="[5, 10, 15, 18]"
      :page-size="sendData.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "users",
  data() {
    return {
      // 总条数
      total: 0,
      // 接口用到的数据
      sendData: {
        query: "",
        pagenum: 1,
        pagesize: 10
      },
      // 用户数组
      userList: []
    };
  },
  methods: {
    // 编辑按钮的点击事件
    handleEdit(index, row) {
      console.log(index); // 索引
      console.log(row); // 数据
    },
    // 搜索用户
    async search() {
      let res = await this.$axios.get("users", {
        // headers: {
        //   Authorization: window.sessionStorage.getItem("token")
        // },
        params: this.sendData
      });
      // console.log(res);
      this.total = res.data.data.total;
      this.userList = res.data.data.users;
    }
  },
  // 接口调用
  created() {
    this.search();
  }
};
</script>

<style lang='scss'>
.users-container {
  background-color: #e9eef3;
  .my-bread {
    background-color: #d3dce6;
    height: 50px;
    line-height: 50px;
    padding-left: 10px;
  }
}
</style>
