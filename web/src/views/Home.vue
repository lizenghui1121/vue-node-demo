<template>
  <div>
    <swiper :options="swiperOptions" @click-slide="handleClickSlide">
      <swiper-slide>
        <img class="w-100" src="../assets/images/998eb31ae1b7511672169603a0d72b43.jpeg" alt />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/be696f15192d84f6c2e14386aa8f8392.jpeg" alt />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/418c9a1853e990aff1d4ac9863edaeea.jpeg" alt />
      </swiper-slide>
      <div class="swiper-pagination pagination-home text-right px-3 pb-2" slot="pagination"></div>
    </swiper>
    <!-- end of swiper -->

    <div class="nav-icons bg-white mt-3 pt-3 text-center text-dark-1">
      <div class="d-flex flex-wrap" :class="canOpen?'can-open':'open'">
        <div class="nav-item mb-3 pt-2" v-for="(item, i) in iconList" :key="i">
          <i :class="`sprite sprite-${item.icon}`"></i>
          <div class="py-1">{{item.name}}</div>
        </div>
      </div>
      <div @click="canOpen = !canOpen" class="bg-light py-2 fs-sm">
        <i class="sprite sprite-arrow mr-1" :class="{'inverse':canOpen}"></i>
        <span>{{btnText}}</span>
      </div>
    </div>
    <!-- end of nav-icons -->

    <!-- 新闻资讯 -->
    <m-list-card icon="menu" title="新闻资讯" :categories="newsCats">
      <template #items="{category}">
        <router-link
          tag="div"
          :to="`/articles/${newsId}`"
          class="py-2 my-1 fs-lg d-flex"
          v-for="(news, i) in category.newsList"
          :key="i"
        >
          <span class="text-info">[{{news.categoryName}}]</span>
          <span class="px-2">|</span>
          <span class="flex-1 text-dark-1 pr-2 text-ellipse">{{news.title}}</span>
          <span class="text-grey fs-sm">{{news.createdAt | dateFormat}}</span>
        </router-link>
      </template>
    </m-list-card>

    <!-- 英雄列表 -->
    <m-list-card icon="card-hero" :image="heroIcon" title="英雄列表" :categories="heroCats">
      <template #items="{category}">
        <div class="d-flex flex-wrap" style="margin: 0 -0.5rem">
          <router-link
            tag="div"
            :to="`/heroes/${heroId}`"
            class="p-2 text-center"
            style="width: 20%;"
            v-for="(hero, i) in category.heroList"
            :key="i"
          >
            <img :src="hero.avatar" alt class="w-100" />
            <div>{{hero.name}}</div>
          </router-link>
        </div>
      </template>
    </m-list-card>

    <!-- 精彩视频 -->
    <m-list-card
      icon="menu"
      title="精彩视频"
      :categories="videoCats"
      style="border-bottom: 1px solid #d4d9de;"
    >
      <template #items="{category}">
        <div class="d-flex flex-wrap" style="margin: 0 -0.25rem">
          <router-link
            tag="div"
            :to="`/videos/${video._id}`"
            class="p-1 mb-2 text-center"
            style="width: 50%;"
            v-for="(video, i) in category.videoList"
            :key="i"
          >
            <img :src="video.image" alt class="w-100" style="height: 95px; width:168px;" />
            <div class="video-title my-2 text-grey-1" style="width: 98%">{{video.title}}</div>
            <div class="v_info d-flex jc-between">
              <span class="v_num fs-xs text-grey ml-2">
                <i class="sprite sprite-play"></i>
                {{video.num | numFormat}}
              </span>
              <span class="v_time fs-xs text-grey">06-20</span>
            </div>
          </router-link>
        </div>
      </template>
    </m-list-card>
    <router-link tag='div' to='/strategycenter' class="bg-white text-grey-1 text-center" style="padding: 0.75rem 0;">
      <span class="fs-sm">加载更多内容</span>
    </router-link>

    <!-- 图文攻略 -->
    <m-list-card
      icon="menu"
      title="图文攻略"
      :categories="strategyCats"
      style="border-bottom: 1px solid #d4d9de;"
    >
      <template #items="{category}">
        <div
          class="py-2 my-1 d-flex jc-start border-bottom"
          v-for="(strategy, i) in category.strategyList"
          :key="i"
        >
          <router-link tag="div" :to="`/strategies/${strategy._id}`" class="pl-1 mr-3">
            <img :src="strategy.image" style="height: 70px;width: 116px;" />
          </router-link>
          <div style="width:14rem; position:relative">
            <router-link tag='div' :to="`/strategies/${strategy._id}`">
              <span class="strategy-title w-100 mb-2 fs-xl">{{strategy.title}}</span>
              <span class="strategy-desc w-100 text-grey-1">{{strategy.description}}</span>
            </router-link>
            <div
              class="s_time fs-xs text-grey"
              style="position:absolute;bottom:-3px; left:0px"
            >06-20</div>
          </div>
        </div>
        <router-link tag="div" to="/strategycenter" class="load-more">
          <div class="bg-white text-grey-1 text-center pt-2">
            <span class="fs-sm">点击查看更多</span>
          </div>
        </router-link>
      </template>
    </m-list-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      swiperOptions: {
        autoplay: true,
        pagination: {
          el: ".pagination-home",
          clickable: true
        }
      },
      newsId: "5eec2c67d61d6860bc2556a2",
      heroId: "5eecaf2413339a361d0ea2a6",
      canOpen: true,
      newsCats: [],
      heroCats: [],
      videoCats: [],
      strategyCats: [],
      iconList: [
        { icon: "blz", name: "爆料站" },
        { icon: "gsz", name: "故事站" },
        { icon: "zbsc", name: "周边商城" },
        { icon: "tyf", name: "体验服" },
        { icon: "xrzq", name: "新人专区" },
        { icon: "rycc", name: "荣耀传承" },
        { icon: "mnzzlk", name: "模拟战资料库" },
        { icon: "wzyd", name: "王者营地" },
        { icon: "gzh", name: "公众号" },
        { icon: "bbjs", name: "版本介绍" },
        { icon: "djhj", name: "对局环境" },
        { icon: "wxwzt", name: "无限王者团" },
        { icon: "cyhdy", name: "创意互动营" }
      ],
      heroIcon: require("../assets/images/898981360562721.jpg")
    };
  },
  computed: {
    btnText() {
      return this.canOpen ? "展开" : "收起";
    }
  },
  filters: {
    dateFormat(val) {
      return val.substring(5, 10).replace("-", "/");
    },
    numFormat(val) {
      if (val < 10000) {
        return val;
      } else {
        return parseFloat(val / 10000).toFixed(1) + "万";
      }
    }
  },
  methods: {
    handleClickSlide(index, reallyIndex) {
      console.log("Click slide!", index, reallyIndex);
    },
    fetchNewsCats() {
      this.$http.get("/news/list").then(res => {
        this.newsCats = res.data;
        console.log(this.newsCats);
      });
    },
    fetchHeroCats() {
      this.$http.get("/heroes/list").then(res => {
        this.heroCats = res.data;
      });
    },
    fetchVideoCats() {
      this.$http.get("/videos/list").then(res => {
        this.videoCats = res.data;
      });
    },
    fetchStrategyCats() {
      this.$http.get("/strategies/list").then(res => {
        this.strategyCats = res.data;
        console.log(this.strategyCats);
      });
    }
  },
  created() {
    this.fetchNewsCats();
    this.fetchHeroCats();
    this.fetchVideoCats();
    this.fetchStrategyCats();
  }
};
</script>

<style lang="scss">
@import "../assets/scss/variables.scss";
.pagination-home {
  .swiper-pagination-bullet {
    border-radius: 0.1538rem;
    opacity: 1;
    background-color: map-get($color, "white");
    &.swiper-pagination-bullet-active {
      background: map-get($color, "info");
    }
  }
}

.nav-icons {
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  .nav-item {
    width: 25%;
    border-right: 1px solid $border-color;
    &:nth-child(4n) {
      border: none;
    }
  }
}

.video-title {
  -webkit-line-clamp: 2;
  display: -webkit-box;
  overflow: hidden;
  line-height: 1.5rem;
  -webkit-box-orient: vertical;
}
.strategy-title {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.strategy-desc {
  -webkit-line-clamp: 2;
  display: -webkit-box;
  overflow: hidden;
  line-height: 1.5rem;
  -webkit-box-orient: vertical;
}

.open {
  height: 260px;
}
.can-open {
  height: 65px;
  overflow: hidden;
}
.inverse {
  transform: rotate(180deg);
}

</style>