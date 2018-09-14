import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(Router);

export default () => new Router({
  mode: 'history',
  base: process.env.APP_HOST,
  routes: [
    {
      path: '/ingredients',
      name: 'ingredients',
      component: () => import(/* webpackChunkName: "login" */ '../views/Ingredients.vue'),
    },
    // {
    //   path: '/menu',
    //   name: 'menu',
    //   component: () => import(/* webpackChunkName: "login" */ '../views/Menu.vue'),
    // },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "login" */ '../views/About.vue'),
    },
    // {
    //   path: '/login',
    //   name: 'login',
    //   component: () => import(/* webpackChunkName: "login" */ '../shared/Login.vue'),
    // },
    {
      path: '/',
      name: 'home',
      component: Home,
    },
  ],
});
