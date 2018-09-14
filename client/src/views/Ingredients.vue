<template>
  <div id="ingredients">
    <v-card width='300px'>
      <v-card-title>Add an Ingredient</v-card-title>
      <v-card-text>
        This is the body text
      </v-card-text>
      <v-card-actions>
        <v-btn>Cancel</v-btn>
        <v-btn>Add</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script lang="ts">
import gql from 'graphql-tag';
export default {
  name: 'Ingredient',
  data() {
    return {
      Ingredient: [],
    };
  },
  apollo: {
    Ingredient: {
      query: gql`query {
        Ingredient {
          id
          name
        }
      }`,
    },
  },
};
</script>
