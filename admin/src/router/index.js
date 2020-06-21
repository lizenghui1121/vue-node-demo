import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Main from '../views/Main.vue'
import CategoryEdit from '../views/CategoryEdit.vue'
import CategoryList from '../views/CategoryList.vue'

import ItemEdit from '../views/ItemEdit.vue'
import ItemList from '../views/ItemList.vue'

import HeroEdit from '../views/HeroEdit.vue'
import HeroList from '../views/HeroList.vue'

import ArticleEdit from '../views/ArticleEdit.vue'
import ArticleList from '../views/ArticleList.vue'

import AdEdit from '../views/AdEdit.vue'
import AdList from '../views/AdList.vue'

import AdminUserEdit from '../views/AdminUserEdit.vue'
import AdminUserList from '../views/AdminUserList.vue'

import SkillEdit from '../views/SkillEdit.vue'
import SkillList from '../views/SkillList.vue'

import MingwenEdit from '../views/MingwenEdit.vue'
import MingwenList from '../views/MingwenList.vue'

import VideoEdit from '../views/VideoEdit.vue'
import VideoList from '../views/VideoList.vue'

import StrategyEdit from '../views/StrategyEdit.vue'
import StrategyList from '../views/StrategyList.vue'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const routes = [
  {path: '/login', name: 'Login', component: Login, meta: {isPublic: true}},
  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [
      { path: '/categories/create', component: CategoryEdit },
      { path: '/categories/list', component: CategoryList },
      { path: '/categories/edit/:id', component: CategoryEdit, props: true },

      { path: '/items/create', component: ItemEdit },
      { path: '/items/list', component: ItemList },
      { path: '/items/edit/:id', component: ItemEdit, props: true },

      { path: '/heroes/create', component: HeroEdit },
      { path: '/heroes/list', component: HeroList },
      { path: '/heroes/edit/:id', component: HeroEdit, props: true },

      { path: '/articles/create', component: ArticleEdit },
      { path: '/articles/list', component: ArticleList },
      { path: '/articles/edit/:id', component: ArticleEdit, props: true },

      { path: '/ads/create', component: AdEdit },
      { path: '/ads/list', component: AdList },
      { path: '/ads/edit/:id', component: AdEdit, props: true },

      { path: '/admin_users/create', component: AdminUserEdit },
      { path: '/admin_users/list', component: AdminUserList },
      { path: '/admin_users/edit/:id', component: AdminUserEdit, props: true },

      { path: '/skills/create', component: SkillEdit },
      { path: '/skills/list', component: SkillList },
      { path: '/skills/edit/:id', component: SkillEdit, props: true },

      { path: '/mingwens/create', component: MingwenEdit },
      { path: '/mingwens/list', component: MingwenList },
      { path: '/mingwens/edit/:id', component: MingwenEdit, props: true },

      { path: '/videos/create', component: VideoEdit },
      { path: '/videos/list', component: VideoList },
      { path: '/videos/edit/:id', component: VideoEdit, props: true },

      { path: '/strategies/create', component: StrategyEdit },
      { path: '/strategies/list', component: StrategyList },
      { path: '/strategies/edit/:id', component: StrategyEdit, props: true },

    ]
  },

  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  if (!to.meta.isPublic && !localStorage.token){
    return next('/login')
  }
  next()
})

export default router
