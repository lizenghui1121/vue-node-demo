import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import StrategyCenter from '../views/StrategyCenter.vue'
import Match from '../views/Match.vue'
import Video from '../views/Video.vue'
import Strategy from '../views/Strategy.vue'
import Main from '../views/Main.vue'
import Article from '../views/Article.vue'
import Hero from '../views/Hero.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    component: Main,
    children: [
      { path: '/', name: 'home', component: Home },
      { path: '/articles/:id', name: 'article', component: Article, props: true },
      { path: '/strategycenter', name: 'strategycenter', component: StrategyCenter },
      { path: '/matchindex', name: 'matchindex', component: Match },
      { path: '/videos/:id', name: 'video', component: Video, props: true },
      { path: '/strategies/:id', name: 'strategy', component: Strategy, props: true },
    ]
  },
  { path: '/heroes/:id', name: 'hero', component: Hero, props: true },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
