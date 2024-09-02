import './assets/main.css'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import { createApp } from 'vue'
import { createWebHistory, createRouter } from 'vue-router'
import App from './App.vue'

import Home from './Pages/Home.vue'
import Favorites from './Pages/Favorites.vue'

const app = createApp(App)

const routes = [
  { path: '/', name : 'home', component: Home },
  { path: '/favorites', name : 'favorites', component: Favorites },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})


app.use(router)
app.use(autoAnimatePlugin)
app.mount('#app')
