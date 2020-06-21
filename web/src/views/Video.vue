<template>
  <div class="about">
    <h1 v-if="id">这是视频详情页,视频id为</h1>
    <p>{{id}}</p>
  </div>
</template>

<script>
export default {
  props: {
    id: {type: String, required: true },
  }
}
</script>