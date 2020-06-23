<template>
  <div>
    <el-card class="login-card">
      <div slot="header" style="text-align: center;">
        <span>MOBA管理后台</span>
      </div>
      <el-form>
        <el-form-item label="用户名">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="model.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-row type="flex" justify="space-around">
            <el-button type="primary" @click="login">登录</el-button>
            <el-button type="success" @click="registry">注册</el-button>
          </el-row>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {
        username: "test",
        password: "123456"
      }
    };
  },
  methods: {
    login() {
      this.$http.post("login", this.model).then(res => {
        localStorage.token = res.data.token;
        localStorage.userId = res.data.id;
        localStorage.currentUser = this.model.username;
        this.$router.push("/");
        this.$message({
          type: "success",
          message: "登录成功！"
        });
      });
    },
    registry() {
      this.$router.push("/registry");
    }
  }
};
</script>

<style>
.login-card {
  min-width: 15rem;
  max-width: 22rem;
  margin: 10rem auto;
}
@media screen and (max-width: 768px) {
  .login-card {
    min-width: 15rem;
    max-width: 22rem;
    margin: 5rem auto;
  }
}
</style>