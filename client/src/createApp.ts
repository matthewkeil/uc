import Vue from 'vue';
import VueApollo from 'vue-apollo';
import Vuetify from 'vuetify';
import { sync } from 'vuex-router-sync';
import '@babel/polyfill';
import './plugins/vuetify';
import 'vuetify/dist/vuetify.min.css';

import App from './App.vue';
import router from '@/router';
import store from '@/store';
import defaultClient from '@/defaultClient';
import '@/registerServiceWorker';

Vue.config.productionTip = false;

Vue.use(VueApollo);
Vue.use(Vuetify);

export default (ssr = false) => {
  const apolloProvider = new VueApollo({ defaultClient: defaultClient(ssr) });

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
