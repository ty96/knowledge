import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import List from '@/components/List'
import Article from '@/components/Article'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/list/:id',
      name: 'List',
      component: List
    },
    {
      path: '/article/:id',
      name: 'Article',
      component: Article
    }
  ]
})
