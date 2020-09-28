import Vue from 'vue'
import Router from 'vue-router'

// Views
import Home from '../views/Home.vue'
import TabView from '../views/Tab.vue'
import Settings from '../views/Settings.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/tab/:id',
      name: 'tab',
      component: TabView
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
