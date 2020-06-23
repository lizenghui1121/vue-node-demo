<template>
  <div>
    <h1>视频列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID"></el-table-column>
      <el-table-column prop="title" label="视频标题"></el-table-column>
      <el-table-column prop="image" label="图标">
        <template slot-scope="scope">
          <img :src="scope.row.image" style="height:3rem">
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button> -->
          <el-button
            type="text"
            @click="$router.push(`/videos/edit/${scope.row._id}`)"
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
    getVideosList() {
      this.$http.get("rest/videos").then(res => {
        this.items = res.data;
        console.log(this.items)
      });
    },
    remove(row) {
      this.$confirm(`是否确定删除视频"${row.name}"`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.delete(`rest/videos/${row._id}`).then(res => {
            console.log(res)
            if(res.data.success){
              this.getVideosList()
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
    this.getVideosList();
  }
};
</script>