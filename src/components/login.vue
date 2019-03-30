<template>
  <div class="login">
    <!-- 居中盒子 -->
    <div class="box">
      <!-- 标题 -->
      <h2>用户登录</h2>
      <!-- 饿了吗ui的form -->
      <el-form label-position="top" label-width="80px">
        <el-form-item label="用户名">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="my-btn" type="primary">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "login"
};
</script>

<style lang='scss'>
.login {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #324152;
  .box{
      width: 550px;
      padding: 35px;
      border-radius: 10px;
      //怪异和模型
      box-sizing: border-box;
      height: 420px;
      background: #fff;
      .my-btn{
          width: 100%;
      }
  }
}
</style>