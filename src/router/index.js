import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/auth/Login'
import ToRegister from '@/components/auth/Register'
import Post from '@/components/posts/Post'
import Detail from '@/components/posts/Detail'
import Create from '@/components/posts/Create'
import Edit from '@/components/posts/Edit'
import Home from '@/components/home/Home'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueHasErrorLaravel from 'vue-has-error-laravel'

Vue.use(VueHasErrorLaravel)
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
      path: '/register',
      name: 'ToRegister',
      component: ToRegister
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
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
