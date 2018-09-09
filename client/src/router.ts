import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

const getRouter = () => new Router({
  mode: 'history',
  base: process.env.APP_HOST,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue'),
    },
  ],
});

export default getRouter();
