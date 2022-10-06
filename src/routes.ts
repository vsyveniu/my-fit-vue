import * as VueRouter from 'vue-router';
import Login from './pages/Login.vue';
import Register from './pages/Register.vue';
import Home from './pages/Home.vue';
import Chain from './pages/Chain.vue';
import { isAuthenticated } from './guards/isAuthenticated';

const routes = [
  { path: '/', component: Home, beforeEnter: isAuthenticated },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/chain', component: Chain, beforeEnter: isAuthenticated },
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes,
});

export default router;
