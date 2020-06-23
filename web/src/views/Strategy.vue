<template>
  <div class="page-strategy">
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

<style>
.page-strategy {
  width: 100%;
  opacity: 1;
  top: 0px;
  zoom: 1;
  transition: all 0.3s ease 0s;
  animation: txtshow .3S;
}

@keyframes txtshow {
  from {
    transform: translateY(100%);
  }

  to {
    transform: none;
  }
}
</style>