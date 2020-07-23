import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Map from '../views/Map.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Icon from 'vue2-svg-icon/Icon.vue'


Vue.component('icon', Icon)
Vue.use(ElementUI);
Vue.use(VueRouter)

  const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Map',
    component: Map
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
