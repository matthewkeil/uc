<template>
  <div>
    <account-button :user="user"/>
    <v-bottom-nav
      :active.sync="activeBtn"
      :value=true
      absolute
      color="white"
      >
      <v-btn
        v-for="(view, index) in views"
        :key="index"
        flat
        color="primary"
        :to="view.to"
        >
        <span>{{ view.text }}</span>
        <v-icon>{{ view.icon }}</v-icon>
      </v-btn>
    </v-bottom-nav>
  </div>
</template>

<script lang="ts">
import AccountButton from './AccountButton.vue';

export default {
  name: 'Toolbar',
  components: {
    AccountButton,
  },
  props: {
    user: Object,
  },
  data() {
    return {
      activeBtn: 0,
      views: [{
        text: 'Home',
        icon: 'home',
        to: '/',
      },{
        text: 'Menu',
        icon: 'view_list',
        to: '/menu',
      },{
        text: 'About',
        icon: 'waves',
        to: '/about',
      }],
    };
  },
  // methods: {
  //   handleClick(index: number) {},
  // },
};
</script>