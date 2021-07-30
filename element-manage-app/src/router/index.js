import Vue from 'vue'
import Router from 'vue-router'
import Todo from '@/pages/Todo.vue'

Vue.use(Router)

const routes = [
  {
    path: '/todo',
    component: Todo,
    name: 'Todo'
  },
  {
    path: '*',
    redirect: {
      name: 'Todo'
    }
  }
]

const router = new Router({
  routes
})

export default router
