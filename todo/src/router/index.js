import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Edit from "../views/edit.vue"
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/editNote/:id',
    name: 'Edit',
    component: Edit,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
