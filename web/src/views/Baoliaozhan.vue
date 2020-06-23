<template>
  <div class="page-blz pb-2 bg-black text-white">
    <div
      class="wrap-title d-flex jc-start ai-center px-3 py-3"
      style="background-image: url(https://game.gtimg.cn/images/yxzj/m/m201706/images/coming/index-title.jpg);"
    >
      <span
        class
        style="float:left;width:.6rem; height:1.2rem;background-image: url(https://game.gtimg.cn/images/yxzj/m/m201706/images/coming/line.png);"
      ></span>
      <span class="fs-xxl mx-2">王者荣耀爆料站</span>
      <span
        class="text-dark fs-xs px-2"
        style="background-size:100%; background-image: url(https://game.gtimg.cn/images/yxzj/m/m201706/images/coming/tips-box.png)"
      >官方消息 一手掌握</span>
    </div>
    <div class="wrap-banner" style="height:185px;">
      <img
        class="w-100 h-100"
        style
        src="https://ossweb-img.qq.com/upload/webplat/info/yxzj/20200407/89260884947785.jpg"
        alt
      />
    </div>
    <!-- end of header -->

    <div class="news-list bg-dark-2" :class="{'canOpen':canOpen}">
      <div class="news-item py-3 px-3 d-flex" v-for="(news, i) in newsList" :key="i">
        <span
          class="news-type fs-xs px-2"
          :class="news.type==='新皮肤'?'new-skin':'new-hero'"
        >{{news.type}}</span>
        <span class="news-title ml-2 flex-1">{{news.title}}</span>
        <span class="news-time fs-xs text-light-2">{{news.time}}</span>
      </div>
    </div>
    <div @click="canOpen=!canOpen" class="py-3 fs-sm text-center bg-dark-3 text-primary">{{canOpen?'展开更多':'收起'}}</div>
    <!-- end of news -->

    <div class="box bg-black">
      <div class="my-3 pt-3 bg-dark-2 text-center" v-for="(banner, i) in bannerList" :key="i">
        <b class="text-primary fs-xl my-">{{banner.type}}</b>
        <div class="text-light-2 my-2">{{banner.title}}</div>
        <div class="my-3 mx-3">
          <img
            class="mb-3 w-100"
            style="height:191.5px;"
            :src="banner.icon"
            alt
          />
        </div>
        <div class="py-3 fs-sm text-center bg-dark-3 text-primary">点击查看全部</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      canOpen: true,
      newsList: [
        { type: "新皮肤", title: "新皮肤神威-马超", time: "2020-06-22" },
        {
          type: "新皮肤",
          title: "新皮肤天狼绘梦者-上官婉儿",
          time: "2020-06-03"
        },
        { type: "新英雄", title: "新英雄秩序统将-蒙恬", time: "2020-06-22" },
        { type: "新皮肤", title: "新皮肤时之恋人-刘备", time: "2020-06-22" },
        { type: "新皮肤", title: "新皮肤时之恋人-孙尚香", time: "2020-06-22" }
      ],
      bannerList: [
        { type: "新英雄", title: "秩序统将-蒙恬  6月2日上线", icon: "https://game.gtimg.cn/images/yxzj/zlkdatasys/images/image/20200529/c63eb835f596defa01b8e3aa0508fe7d.jpg"},
        { type: "新皮肤", title: "「神威·马超」即将上线", icon: "https://game.gtimg.cn/images/yxzj/zlkdatasys/images/image/20200622/1c314880adab91200f93c8fbeaedf26e.jpg"},
        { type: "英雄重塑", title: "新英雄秩序统将-蒙恬", icon: "https://game.gtimg.cn/images/yxzj/zlkdatasys/images/image/20200409/ff2875e36e99b804f8b01f6287a75a96.jpg"},
        { type: "英雄调整", title: "正义爆轰-廉颇 4月29日上线", icon: "https://game.gtimg.cn/images/yxzj/zlkdatasys/images/image/20200622/901c54017bf1eeffc8e734b601502281.jpg"},
        { type: "新模式", title: "千金重弩-孙尚香 6月23日调整", icon: "https://game.gtimg.cn/images/yxzj/zlkdatasys/images/image/20200110/e8bc96eac6369b7d0038f9a385afc233.jpg"},
        { type: "新系统", title: "王者模拟战（S1赛季）", icon: "https://game.gtimg.cn/images/yxzj/zlkdatasys/images/image/20200109/d766af55b6c71ef9bed06b3c794155ca.jpg"},
        { type: "系统优化", title: "信誉系统优化 1月9日上线", icon: "https://game.gtimg.cn/images/yxzj/zlkdatasys/images/image/20200109/9d9c30f3d90a598a0d9a53f800449661.jpg"},
        { type: "美术优化", title: "地狱岩魂美术优化 4月29日上线", icon: "https://game.gtimg.cn/images/yxzj/zlkdatasys/images/image/20200426/5c9e77d91588a8e0f3a5b772d3be69ae.jpg"}
      ]
    };
  }
};
</script>

<style lang="scss">
@import "../assets/scss/variables.scss";
.news-list {
  .new-skin {
    color: map-get($color, "blue");
    border: 1px solid map-get($color, "blue");
    border-radius: 10px;
  }
  .new-hero {
    color: map-get($color, "red-1");
    border: 1px solid map-get($color, "red-1");
    border-radius: 10px;
  }
}
.canOpen {
  height: 10rem;
  overflow: hidden;
}
</style>