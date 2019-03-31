<template>
  <div class="login">
    <!-- 居中盒子 -->
    <div class="box">
      <!-- 标题 -->
      <h2>用户登录</h2>
      <!-- 饿了吗ui的form -->
      <el-form
        label-position="top"
        ref="loginForm"
        :model="loginForm"
        :rules="rules"
        label-width="80px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit('loginForm')">登录</el-button>
          <el-button type="primary" @click="resetForm('loginForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      //表单数据
      loginForm: {
        username: "",
        password: ""
      },
      //表单验证规则
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          { min: 5, max: 12, message: "长度在 5 到 12 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 16, message: "长度在 6 到 16 个字符", trigger: "blur" }
        ]
      }
    };
  },
  //方法
  methods: {
    //表单提交
    submit(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          //成功 提交数据
          let res = await this.$axios.post("login", this.loginForm);
          if (res.data.meta.status === 400) {
            this.$message.error(res.data.meta.msg);
          } else if (res.data.meta.status === 200) {
            this.$message.success(res.data.meta.msg);
            //缓存数据
            window.sessionStorage.setItem("token", res.data.data.token);
            //跳转到主页
            this.$router.push("/");
          }
        } else {
          //失败
          this.$message.error("数据格式错误，请根据提示修改");
          return false;
        }
      });
    },
    //重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang='scss'>
.login {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #324152;
  .box {
    width: 550px;
    padding: 35px;
    border-radius: 10px;
    //怪异和模型
    box-sizing: border-box;
    height: 420px;
    background: #fff;
    .my-btn {
      width: 100%;
    }
  }
}
</style>