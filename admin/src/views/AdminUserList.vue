<template>
  <div>
    <h1>管理员列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID"></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button> -->
          <el-button
            type="text"
            @click="$router.push(`/admin_users/edit/${scope.row._id}`)"
            size="small"
          >编辑</el-button>
          <el-button
            type="text"
            @click="remove(scope.row)"
            size="small"
          >删除</el-button>
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
    };
  },
  methods: {
    getCategoryList() {
      this.$http.get("rest/admin_users").then(res => {
        this.items = res.data;
      });
    },
    remove(row) {
      this.$confirm(`是否确定删除用户"${row.username}"`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.delete(`rest/admin_users/${row._id}`).then(res => {
            console.log(res)
            if(res.data.success){
              this.getCategoryList()
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }
          })
        })
        .catch(() => {

        })
    }
  },
  created() {
    this.getCategoryList();
  }
};
</script>