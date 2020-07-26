import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Map from '../views/Map.vue'
import SchoolInfo from '../views/SchoolInfo.vue'
import Icon from 'vue2-svg-icon/Icon.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'


Vue.use(VueAwesomeSwiper, /* { default options with global component } */)
Vue.component('icon', Icon)
Vue.use(ElementUI);
Vue.use(VueRouter)

  const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Map',
    component: Map
  },
  {
    path: '/schoolinfo',
    name: 'schoolinfo',
    component: SchoolInfo
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
