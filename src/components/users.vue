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
        <el-input
          placeholder="请输入内容"
          v-model="sendData.query"
          @keyup.native.enter="search"
          class="input-with-select"
        >
          <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="12">
        <el-button type="success" @click="addFormVisible=true" plain>添加用户</el-button>
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
          <el-switch
            @change="stateChange(scope.row)"
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
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
          <el-button
            @click="delOne(scope.row)"
            type="danger"
            size="mini"
            icon="el-icon-delete"
            plain
          ></el-button>
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

    <!-- 新增弹框 -->
    <el-dialog title="添加用户" :visible.sync="addFormVisible">
      <el-form :model="addForm" :rules="addRules" ref="addForm">
        <el-form-item label="用户名" label-width="100px" prop="username">
          <el-input v-model="addForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="100px" prop="password">
          <el-input v-model="addForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="100px">
          <el-input v-model="addForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="100px">
          <el-input v-model="addForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAdd('addForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑弹框 -->
    <el-dialog title="编辑用户" :visible.sync="editFormVisible">
      <el-form :model="editForm" :rules="addRules" ref="editForm">
        <el-form-item label="用户名" label-width="100px" prop="username">
          <el-input v-model="editForm.username" disabled autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="100px">
          <el-input v-model="editForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="100px">
          <el-input v-model="editForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitEdit('editForm')">确 定</el-button>
      </div>
    </el-dialog>
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
      userList: [],
      // 是否显示新增对话框
      addFormVisible: false,
      // 是否显示编辑对话框
      editFormVisible: false,
      // 新增表单
      addForm: {
        username: "小小冰",
        password: "123456",
        email: "littleice@qq.com",
        mobile: "18888888888"
      },
      // 编辑表单
      editForm: {
        username: "小小冰",
        email: "littleice@qq.com",
        mobile: "18888888888"
      },
      // 新增表单的验证规则
      addRules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 16, message: "密码长度6-16之间", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    // 编辑按钮的点击事件
    async handleEdit(index, row) {
      console.log(index); // 索引
      console.log(row); // 数据
      let res = await this.$axios.get(`users/${row.id}`);
      // console.log(res);
      this.editForm = res.data.data;
      // 弹框
      if (res.data.meta.status === 200) {
        this.editFormVisible = true;
      }
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
    },
    // 状态改变
    stateChange(row) {
      // console.log(row);
      // 接口调用
      this.$axios.put(`users/${row.id}/state/${row.mg_state}`);
    },
    // 提交新增
    submitAdd(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          // alert("submit!");
          // 接口调用
          let res = await this.$axios.post("users", this.addForm);
          // console.log(res);
          // 如果新增成功 重新获取用户列表
          if (res.data.meta.status === 201) {
            this.search();
          }
          // 关闭弹框
          this.addFormVisible = false;
        } else {
          this.$message.error("哥们，亲正确输入数据");
          return false;
        }
      });
    },
    // 保存修改
    async submitEdit(formName) {
      // 修改的字段可以为空 这个不用表单验证
      // 直接发请求即可
      let res = await this.$axios.put(`users/${this.editForm.id}`, {
        email: this.editForm.email,
        mobile: this.editForm.mobile
      });
      // console.log(res);
      if (res.data.meta.status === 200) {
        this.search();
      }
      // 关闭弹框
      this.editFormVisible = false;
    },
    // 删除用户
    delOne(row) {
      this.$confirm("亲，你真的要永久删除该用户, 吗 o(╥﹏╥)o?", "提示", {
        confirmButtonText: "狠心删除",
        cancelButtonText: "良心发现",
        type: "warning"
      })
        .then(async () => {
          // axios
          let res = await this.$axios.delete(`users/${row.id}`);
          if (res.data.meta.status === 200) {
            this.search();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "你真好o(^▽^)o"
          });
        });
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
