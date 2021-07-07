import Vue from 'vue'
import VueRouter from 'vue-router'
import Publicacao from '../views/Publicacao.vue'
import Home from '../views/Home.vue'
import Perfil from '../views/Perfil.vue'
import Modalidades from '../views/Modalidades.vue'
import ListaPublicacao from '../views/ListaPublicacao.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/' || '/eventos_data',
    name: 'Home',
    component: Home
  },
  {
    path:'/eventos_modalidades',
    name: 'Modalidades',
    component: Modalidades
  },
  {
    path: '/user/:id',
    name: 'Perfil',
    component: Perfil
  },
  {
    path: '/posts/:id',
    name: 'Publicacao',
    component: Publicacao
  },
  {
    path: '/posts',
    name: 'Posts',
    component: ListaPublicacao
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
