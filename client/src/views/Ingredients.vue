<template>
  <div id="ingredients">
    <h2>
      List of Ingredients: 
    </h2>
    <br />
    <div v-for="(ingredient, idx) in ingredients" :key="ingredient.name">
      <h3>
        {{ idx }}. {{ ingredient.name }}
      </h3>
    </div>
  </div>
</template>

<script lang="ts">
import gql from 'graphql-tag';
export default {
  name: 'Ingredients',
  data() {
    return {
      ingredients: [],
    };
  },
  apollo: {
    ingredients: {
      query: gql`query ingredients {
        ingredients {
          name
        }
      }`,
    },
  },
};
</script>
