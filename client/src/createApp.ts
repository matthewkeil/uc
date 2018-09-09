import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import VueApollo from 'vue-apollo';
// @ts-ignore - no definition file
import ApolloSSR from 'vue-apollo/ssr';
import { sync } from 'vuex-router-sync';

import App from './App.vue';
import router from '@/router';
import defaultClient from '@/defaultClient';
// import '@/registerServiceWorker';

Vue.config.productionTip = false;

Vue.use(Vuex);
Vue.use(VueRouter)
Vue.use(VueApollo);

if (!window && process.hasOwnProperty('env')) {
  Vue.use(ApolloSSR);
}

export default (ssr = false) => {
  const apolloProvider = new VueApollo({ defaultClient: defaultClient(ssr) });

  const store = new Vuex.Store({});

  sync(store, router);

  const app = new Vue({
    el: '#app',
    router,
    store,
    apolloProvider,
    render: (h) => h(App),
  });

  return {
    app,
    apolloProvider,
    router,
    store,
  };
};
