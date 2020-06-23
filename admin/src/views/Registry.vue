<template>
  <div>
    <el-card class="resistry-card">
      <div slot="header" style="text-align: center;">
        <span>欢迎注册MOBA</span>
      </div>
      <el-form @submit.native.prevent="registry">
        <el-form-item label="用户名">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="model.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-row type="flex" justify="center">
            <el-button type="success" native-type="submit">注册</el-button>
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
        username: "",
        password: ""
      }
    };
  },
  methods: {
    registry() {
      this.$http.post("registry", this.model).then(res => {
        localStorage.token = res.data.token;
        localStorage.userId = res.data.id;
        localStorage.currentUser = this.model.username
        this.$router.push("/");
        this.$message({
          type: "success",
          message: "登录成功！"
        });
      });
    }
  }
};
</script>

<style>
.resistry-card {
  min-width: 15rem;
  max-width: 25rem;
  margin: 10rem auto;
}
</style>