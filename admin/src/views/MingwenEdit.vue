<template>
  <div class="about">
    <h1>{{id ? '编辑': '新建'}}铭文</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <!-- <el-form-item label="上级分类">
        <el-select v-model="model.parent">
          <el-option v-for="item in parents" :key="item._id"
          :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>-->
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :headers="getAuthHeaders()"
          :show-file-list="false"
          :on-success="afterUpload"
        >
          <img v-if="model.icon" :src="model.icon" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="作用1">
        <el-input v-model="model.description1"></el-input>
      </el-form-item>
      <el-form-item label="作用2">
        <el-input v-model="model.description2"></el-input>
      </el-form-item>
      <el-form-item label="作用3">
        <el-input v-model="model.description3"></el-input>
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
      model: {}
    };
  },
  methods: {
    afterUpload(res) {
      this.$set(this.model, 'icon', res.url)
    },
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`rest/mingwens/${this.id}`, this.model);
      } else {
        res = await this.$http.post("rest/mingwens", this.model);
      }
      console.log(res);
      this.$router.push("/mingwens/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    getMingwens() {
      this.$http.get(`rest/mingwens/${this.id}`).then(res => {
        this.model = res.data;
      });
    }
  },
  created() {
    this.id && this.getMingwens();
  },
  watch: {
    $route: function() {
      this.model = {};
    }
  }
};
</script>

<style>

</style>
