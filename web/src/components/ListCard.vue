<template>
  <m-card :icon="icon" :plain="plain" :image="image" :title="title">
    
    <div class="nav jc-between">
      <div
        class="nav-item"
        :class="{active: activeIndex == i}"
        v-for="(category, i) in categories"
        :key="i"
        @click="$refs.list.$swiper.slideTo(i)"
      >
        <div class="nav-link">{{category.name}}</div>
      </div>
    </div>
    <div class="pt-3">
      <swiper
        ref="list"
        :options="{autoHeight: true}"
        @slide-change="() => activeIndex=$refs.list.$swiper.realIndex"
      >
        <swiper-slide v-for="(category, i) in categories" :key="i">
          <slot name="items" :category="category"></slot>
        </swiper-slide>
      </swiper>
    </div>
  </m-card>
</template>

<script>
export default {
  props: {
    icon: { type: String, required: true },
    title: { type: String, required: true },
    categories: { type: Array, required: true },
    plain: { type: Boolean},
    image: { type: String}
  },
  data() {
    return {
      activeIndex: 0
    };
  },

  methods: {
    test() {
      console.log(this.$refs.list);
    }
  }
};
</script>

<style>
</style>