<template>
  <div class="card p-3 mt-3 bg-white">
    <div class="card-header " :class="{'border-bottom': !plain, 'pb-3': !plain}">
      <div class="d-flex ai-center">
        <i class="iconfont" :class="`icon-${icon}`"></i>
        <div class="fs-xl flex-1 px-2">
          <strong>{{title}}</strong>
        </div>
        <i class="iconfont icon-menu1" v-if="!plain"></i>
      </div>
      <div v-if="image" class="mt-3">
        <img :src="image" class="w-100" />
      </div>
    </div>
    <div class="cardbody pt-3">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, required: true },
    icon: { type: String, required: true },
    plain: { type: Boolean },
    image: { type: String },
  }
};
</script>

<style lang='scss'>
@import "../assets/scss/variables";
.card {
  border-bottom: 1px solid $border-color;
}
</style>