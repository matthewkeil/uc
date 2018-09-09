<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title>UTILA.coffee</v-toolbar-title>
      <v-spacer />
      <v-btn>Menu</v-btn>
    </v-toolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from './shared/HelloWorld';
import Login from './shared/Login';
import Register from './shared/Register';

export default {
  name: 'App',
  components: {
    HelloWorld,
    Login,
    Register,
  },
  data() {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [{
        icon: 'bubble_chart',
        title: 'Inspire',
      }],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
    };
  },
};
</script>
