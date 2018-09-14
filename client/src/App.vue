<template>
  <v-app>
    <Toolbar />
    <v-content>
      <router-view />
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
import Toolbar from './shared/Toolbar';
import Footer from './shared/Footer';

export default {
  name: 'App',
  components: {
    Toolbar,
    Footer,
  },
};
</script>