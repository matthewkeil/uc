import Vue from 'vue';
import VueApollo from 'vue-apollo';
import { sync } from 'vuex-router-sync';
import {getRouter, getStore, getDefaultClient} from '@/core';
import App from './App.vue';

Vue.config.productionTip = false;
Vue.use(VueApollo);

export default (ssr: boolean = false) => {
  const apolloProvider = new VueApollo({ defaultClient: getDefaultClient(ssr) });
  const router = getRouter();
  const store = getStore();
  sync(store, router);

  return {
    apolloProvider,
    router,
    store,
    app: new Vue({
      el: '#app',
      apolloProvider,
      router,
      store,
      render: (h) => h(App),
    }),
  };
};
