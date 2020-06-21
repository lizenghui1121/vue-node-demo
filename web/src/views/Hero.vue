<template>
  <div class="page-hero" v-if="model">
    <div class="topbar bg-black py-2 px-3 d-flex ai-center">
      <img src="../assets/logo.png" height="30" />
      <div class="px-2 flex-1 text-white">
        <span>王者荣耀</span>
        <span class="ml-2">攻略战</span>
      </div>
      <router-link tag="div" to="/" class="text-white">更多英雄 &gt;</router-link>
    </div>
    <div class="top" :style="{backgroundImage: `url(${model.banner})`}">
      <div class="info text-white p-3 h-100 d-flex flex-column jc-end">
        <div class="fs-sm">{{model.title}}</div>
        <h2 class="my-2">{{model.name}}</h2>
        <div class="fs-sm">{{model.categories.map(v => v.name).join('/')}}</div>
        <div class="d-flex jc-between pt-2 fs-sm">
          <div class="scores d-flex ai-center" v-if="model.scores">
            <span>难度</span>
            <span class="badge bg-primary">{{model.scores.difficult}}</span>
            <span>技能</span>
            <span class="badge bg-blue-1">{{model.scores.skills}}</span>
            <span>攻击</span>
            <span class="badge bg-danger">{{model.scores.attack}}</span>
            <span>生存</span>
            <span class="badge bg-dark">{{model.scores.survive}}</span>
          </div>
          <router-link tag="span" to="/" class="text-grey">皮肤 {{model.skinCount}} &gt;</router-link>
        </div>
      </div>
    </div>
    <!-- end of top -->
    <div class="bg-white px-3">
      <div class="nav d-flex pt-3 pb-2 jc-around border-bottom">
        <div class="nav-item active">
          <div class="nav-link">英雄初识</div>
        </div>
        <div class="nav-item">
          <div class="nav-link">进阶攻略</div>
        </div>
      </div>
    </div>
    <swiper>
      <swiper-slide>
        <div>
          <div class="p-3 bg-white border-bottom">
            <div class="d-flex">
              <router-link tag="button" to="/" class="btn btn-lg flex-1">
                <i class="iconfont icon-menu"></i>
                英雄介绍视频
              </router-link>
              <router-link tag="button" to="/" class="btn btn-lg flex-1 ml-2">
                <i class="iconfont icon-menu"></i>
                一图识英雄
              </router-link>
            </div>

            <!-- skills -->
            <div class="skills bg-whiter mt-4">
              <div class="d-flex jc-around">
                <img
                  class="icon"
                  @click="currentSkillIndex=i"
                  :class="{active: currentSkillIndex === i}"
                  v-for="(item, i) in model.skills"
                  :key="i"
                  :src="item.icon"
                />
              </div>
              <div v-if="currentSkill">
                <div class="d-flex py-3 my-2">
                  <h3 class="m-0">{{currentSkill.name}}</h3>
                  <span class="text-grey-1 fs-sm ml-4">
                    (冷却值: {{currentSkill.delay}}
                    消耗: {{currentSkill.cost}})
                  </span>
                </div>
                <p class="mt-1 mb-0">{{currentSkill.description}}</p>
              </div>
            </div>
          </div>

          <!-- 加点建议 -->
          <m-card icon="menu" plain title="加点建议" class="skill-suggest">
            <div class="d-flex jc-between px-3">
              <div class="main-skill text-center">
                <div class="pb-2 fs-xl">主升</div>
                <img :src="model.skills[2].icon" alt />
                <div class="fs-xs">{{model.skills[2].name}}</div>
              </div>
              <div class="second-skill ml-5 text-center">
                <div class="pb-2 fs-xl">副升</div>
                <img :src="model.skills[1].icon" alt />
                <div class="fs-xs">{{model.skills[1].name}}</div>
              </div>
              <div class="main-skill flex-1 ml-5 text-center">
                <div class="pb-2 fs-xl">召唤师技能</div>
                <div class="d-flex jc-between">
                  <div v-for="(summonerSkill, i) in model.summonerSkills" :key="i">
                    <img :src="summonerSkill.icon" alt />
                    <div class="fs-xs">{{summonerSkill.name}}</div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 出装推荐 -->
            <m-card plain icon="menu" title="出装推荐" class="hero-items mt-4 pb-0" style="margin:0.5rem -1rem 0 -1rem; border-bottom:none">
              <div class="fs-xl">顺风出装</div>
              <div class="d-flex jc-around text-center mt-3">
                <div v-for="(item, i) in model.items1" :key="i">
                  <img :src="item.icon" class="icon" />
                  <div class="fs-xs">{{item.name}}</div>
                </div>
              </div>
              <div class="border-bottom mt-3"></div>
              <div class="fs-xl mt-3">逆风出装</div>
              <div class="d-flex jc-around text-center mt-3">
                <div v-for="item in model.items2" :key="item.name">
                  <img :src="item.icon" class="icon" />
                  <div class="fs-xs">{{item.name}}</div>
                </div>
              </div>
            </m-card>
          </m-card>

          

          <!-- 铭文推荐 -->
          <m-card plain icon="menu" title="铭文推荐" class="hero-mingwens">
            <div class="d-flex jc-between">
              <div class="d-flex jc-between" v-for="(item, i) in model.mingwens" :key="i">
                <img :src="item.icon" alt="">
                <div class="ml-2">
                  <div class="fs-xl py-1">{{item.name}}</div>
                  <p class="fs-xs my-0" v-if="item.description1">{{item.description1}}</p>
                  <p class="fs-xs my-0" v-if="item.description2">{{item.description2}}</p>
                  <p class="fs-xs my-0" v-if="item.description3">{{item.description3}}</p>
                </div>
              </div>
            </div>
          </m-card>

          <m-card plain icon="menu" title="使用技巧">
            <p class="m-0">{{model.usageTips}}</p>
          </m-card>
          <m-card plain icon="menu" title="对抗技巧">
            <p class="m-0">{{model.battleTips}}</p>
          </m-card>
          <m-card plain icon="menu" title="团战思路">
            <p class="m-0">{{model.teamTips}}</p>
          </m-card>
          <m-card plain icon="menu" title="英雄关系">
            <div class="fs-xl">最佳搭档</div>
            <div v-for="item in model.partners" :key="item.name" class="d-flex pt-3">
              <img :src="item.hero.avatar" alt height="50" />
              <p class="flex-1 m-0 ml-3">{{item.description}}</p>
            </div>
            <div class="border-bottom mt-3"></div>
            <div class="fs-xl mt-2">被谁克制</div>
            <div v-for="item in model.restrained" :key="item.name" class="d-flex pt-3">
              <img :src="item.hero.avatar" alt height="50" />
              <p class="flex-1 m-0 ml-3">{{item.description}}</p>
            </div>
            <div class="border-bottom mt-3"></div>
            <div class="fs-xl mt-2">克制谁</div>
            <div v-for="item in model.restrain" :key="item.name" class="d-flex pt-3">
              <img :src="item.hero.avatar" alt height="50" />
              <p class="flex-1 m-0 ml-3">{{item.description}}</p>
            </div>
            <!-- <div class="border-bottom mt-3"></div> -->
          </m-card>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
export default {
  props: {
    id: { requried: true }
  },
  data() {
    return {
      model: null,
      currentSkillIndex: 0
    };
  },
  computed: {
    currentSkill() {
      return this.model.skills[this.currentSkillIndex];
    }
  },
  methods: {
    fetch() {
      this.$http.get(`/heroes/${this.id}`).then(res => {
        this.model = res.data;
        console.log(res.data);
      });
    }
  },
  created() {
    this.fetch();
  }
};
</script>

<style lang="scss">
@import "../assets/scss/_variables.scss";
.page-hero {
  .top {
    height: 50vw;
    background-size: 100% auto;
  }
  .info {
    * {
      animation: txtshow 1s;
      animation-fill-mode: forwards;
    }
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
    .scores {
      .badge {
        margin: 0 0.5rem;
        display: inline-block;
        height: 1rem;
        width: 1rem;
        line-height: 0.9rem;
        text-align: center;
        border-radius: 50%;
        font-size: 0.6rem;
        border: 1px solid rgba(255, 255, 255, 0.2);
      }
    }
  }
  .skills {
    img.icon {
      width: 65px;
      height: 65px;
      border: 3px solid map-get($color, "white");
      &.active {
        border-color: map-get($color, "primary");
      }
      border-radius: 45%;
    }
  }
  .skill-suggest {
    img {
      width: 60px;
      height: 60px;
      border: 3px solid map-get($color, "white");
      border-radius: 45%;
    }
  }
  .hero-mingwens {
    img {
      width: 33.5px;
      height: 39.5px;
    }
  }
  .hero-items {
    img.icon {
      width: 45px;
      height: 45px;
      border-radius: 50%;
    }
  }
}

@-webkit-keyframes txtshow {
  from {
    opacity: 0;
    transform: translateX(-100px);
  }

  to {
    opacity: 1;
    transform: none;
  }
}

@keyframes txtshow {
  from {
    opacity: 0;
    transform: translateX(-100px);
  }

  to {
    opacity: 1;
    transform: none;
  }
}
</style>