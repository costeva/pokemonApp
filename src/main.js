import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap'
import './style.css'


import welcome from './modules/welcome/router/index.js'
 import list from './modules/get-pokemon-list/router/index.js'
 import favorite from './modules/pokemon-favorites/router/index.js' 

const routes = [
 ...welcome, ...list, ...favorite
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const app = createApp(App)

const pinia = createPinia()

app.provide('router', router)
app.use(pinia)

app.use(router)


app.mount('#app')
