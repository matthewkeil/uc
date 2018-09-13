import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(Router);

export default () => new Router({
  mode: 'history',
  base: process.env.APP_HOST,
  routes: [
    {
      path: '/',
      name: 'ingredients',
      component: () => import(/* webpackChunkName: "login" */ '../views/Ingredients.vue'),
    },
    // {
    //   path: '/',
    //   name: 'home',
    //   component: Home,
    // },
  ],
});
