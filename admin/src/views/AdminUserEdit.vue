<template>
  <div class="about">
    <h1>{{id ? '编辑': '新建'}}管理员</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      
      <el-form-item label="用户名">
        <el-input v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="text" v-model="model.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {}
  },
  data() {
    return {
      model: {},
      parents:[]
    }
  },
  methods: {
    async save(){
      let res;
      if (this.id) {
        res = await this.$http.put(`rest/admin_users/${this.id}`, this.model)
      } else {
        res = await this.$http.post('rest/admin_users', this.model)
      }
      console.log(res)
      this.$router.push('/admin_users/list')
      this.$message({
        type: 'success',
        message: '保存成功',
      })
    },
    getCategories(){
      this.$http.get(`rest/admin_users/${this.id}`).then(res =>{
        this.model = res.data
      })
    },
    fetchParents(){
      this.$http.get(`rest/admin_users`).then(res =>{
        this.parents = res.data
      })
    }
  },
  created(){
    this.fetchParents()
    this.id && this.getCategories()

  },
  watch: {
    '$route':function() {
      this.model = {}
    }
  }
}
</script>