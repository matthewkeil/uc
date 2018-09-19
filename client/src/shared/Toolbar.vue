<template>
    <v-toolbar app color="primary">
        <v-toolbar-title class="white--text">UTILA.coffee</v-toolbar-title>
        <v-spacer />
        <account-button />
    </v-toolbar>
</template>

<script>
import AccountButton from './AccountButton';

export default {
  name: 'Toolbar',
  components: {
    AccountButton,
  },
};
</script>