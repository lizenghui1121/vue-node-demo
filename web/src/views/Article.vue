<template>
  <div class="page-article" v-if="model">
    <div class="d-flex py-3 px-2 border-bottom">
      <div @click="$router.push('/')" class="iconfont icon-back text-blue"></div>
      <strong class="flex-1 text-blue pl-2">{{model.title}}</strong>
      <div class="text-grey fs-xs">2020-06-19</div>
    </div>
    <div v-html="model.body" class="px-3 py-3 fs-xl body"></div>
    <div class="mt-2 py-2 px-3 border-top">
      <i class="iconfont icon-menu"></i>
      <strong class="text-blue fs-lg ml-1">相关资讯</strong>
      <div class="py-2">
        <router-link
          class="py-1 related text-ellipse"
          tag="div"
          :to="`/articles/${item._id}`"
          v-for="(item, i) in model.related"
          :key="i"
        >{{item.title}}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: { required: true }
  },
  data() {
    return {
      model: null
    };
  },
  watch: {
    id: 'fetchArticle'
  },
  methods: {
    fetchArticle() {
      this.$http.get(`/articles/${this.id}`).then(res => {
        this.model = res.data;
      });
    }
  },
  created() {
    this.fetchArticle();
  }
};
</script>

<style lang="scss">
.page-article {
  .icon-back {
    font-size: 1.3rem;
  }
  .body {
    img {
      width: 100%;
      height: auto;
    }
    iframe {
      width: 100%;
      height: auto;
    }
  }
  .related{
    width: 75%;
  }
}
</style>