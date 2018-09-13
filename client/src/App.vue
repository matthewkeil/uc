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
// import Ingredients from './shared/Ingredients';

export default {
  name: 'App',
  // components: {
  //   Ingredients,
  // },
};
</script>
