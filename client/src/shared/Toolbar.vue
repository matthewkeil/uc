<template>
    <v-toolbar app color="primary">
        <v-toolbar-title class="white--text">UTILA.coffee</v-toolbar-title>
        <v-spacer />
        <v-dialog v-model="logihDialog" max-width="500px">
            <v-btn flat icon color="primary" slot='activator'>
                <v-icon color="white">account_circle</v-icon>
            </v-btn>
            <Login slot='default'/>
        </v-dialog>
    </v-toolbar>
</template>

<script>
import Login from './Login';

export default {
  name: 'Toolbar',
  components: {
    Login
  },
  data: () => ({
    logihDialog: false
   })
};
</script>