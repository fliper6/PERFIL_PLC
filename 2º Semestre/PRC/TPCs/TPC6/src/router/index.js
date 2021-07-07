import Vue from 'vue'
import VueRouter from 'vue-router'
import Authors from '../views/Authors.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/authors',
    name: 'Authors',
    component: Authors
  },
  {
    path: '/pubs',
    name: 'pubs',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Pubs.vue')
  },
  {
    path: '/pubs/:idPub',
    name: 'Pub',
    component: () => import('../views/Pub.vue')
  },
  {
    path: '/authors/:idAut',
    name: 'Author',
    component: () => import('../views/Author.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
