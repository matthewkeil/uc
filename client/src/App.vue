<template>
  <v-app>
    <v-content class="content">
      <router-view />
    </v-content>
    <Toolbar :user="user" />
  </v-app>
</template>

<style lang="scss" scoped>
  .content {
    width: 100%;
    height: 100%;
  }
</style>


<script>
import Toolbar from './shared/Toolbar';

export default {
  name: 'App',
  components: {
    Toolbar,
  },
  computed: {
    user() {
      return undefined;
    },
  },
};
</script>