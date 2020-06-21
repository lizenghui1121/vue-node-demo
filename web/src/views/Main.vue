<template>
  <div>
    <div class="topbar bg-black py-2 px-3 d-flex ai-center">
      <img src="../assets/logo.png" height="30">
      <div class="px-2 flex-1">
        <div class="text-white">王者荣耀</div>
        <div class="text-grey-1 fs-xxs">团队成就更多</div>
      </div>
      <button type="button" class="btn bg-primary" @click="redict">立即下载</button>
    </div>
    <div class="bg-primary pt-3 pb-2">
      <div class="nav jc-around nav-inverse text-white">
        <div class="nav-item" :class="{'active': $route.path==='/'}">
          <router-link class="nav-link" tag="div" to="/">首页</router-link>
        </div>
        <div class="nav-item" :class="{'active': $route.path==='/strategycenter'}">
          <router-link class="nav-link" tag="div" to="/strategycenter">攻略中心</router-link>
        </div>
        <div class="nav-item" :class="{'active': $route.path==='/matchindex'}">
          <router-link class="nav-link" tag="div"  to="/matchindex">赛事中心</router-link>
        </div>
      </div>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  methods: {
    redict() {
      window.location.href = 'https://pvp.qq.com/zlkdatasys/mct/d/play.shtml'
    }
  }
}
</script>

<style lang="scss">
.topbar {
  position: sticky;
  top: 0;
  z-index: 999;
}
</style>