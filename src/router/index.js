import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login.vue'
import Todolist from '../components/TodoLIst.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: Login
    },
    {
      path: '/todolist',
      name: 'Todolist',
      component: Todolist
    }
  ]
})
