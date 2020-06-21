<template>
  <div class="about">
    <h1>这是图文攻略详情页，图文id为</h1>
    <p>{{id}}</p>
  </div>
</template>


<script>
export default {
  props: {
    id: { type: String, required: true }
  }
};
</script>