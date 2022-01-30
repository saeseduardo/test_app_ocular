import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/auth/Login'
import Post from '@/components/posts/Post'
import Detail from '@/components/posts/Detail'
import Create from '@/components/posts/Create'
import Edit from '@/components/posts/Edit'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/posts',
      name: 'Posts',
      component: Post
    },
    {
      path: '/post/:post',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/post/:post/edit',
      name: 'Edit',
      component: Edit
    },
    {
      path: '/post',
      name: 'Create',
      component: Create
    }
  ]
})
