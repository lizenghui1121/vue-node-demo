<template>
  <div>
    <h1>铭文列表</h1>
    <el-table :data="items">
      <el-table-column v-if="!isMobie" prop="_id" label="ID"></el-table-column>
      <el-table-column prop="name" label="铭文名称"></el-table-column>
      <el-table-column prop="icon" label="图标">
        <template slot-scope="scope">
          <img :src="scope.row.icon" style="height:3rem">
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button> -->
          <el-button
            type="text"
            @click="$router.push(`/mingwens/edit/${scope.row._id}`)"
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
      this.$http.get("rest/mingwens").then(res => {
        this.items = res.data;
      });
    },
    remove(row) {
      this.$confirm(`是否确定删除铭文"${row.name}"`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.delete(`rest/mingwens/${row._id}`).then(res => {
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
    // window.addEventListener('resize', this.handleResize)
  }
};
</script>