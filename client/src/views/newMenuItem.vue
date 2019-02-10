<template>
  <div id="backdrop" class="primary">
    <v-container>
      <v-layout align-center justify-center>
        <v-flex xs12 sm9 md7 lg6 xl4>
          <v-card class="elevatioohn-30 pa-3">
            <v-card-text>
              <div class="layout column align-center">
                <h1 class="flex my-4 primary--text">Add a menu item</h1>
              </div>                
              <v-form>
                <v-text-field name="itemName" label="Item Name" type="text" v-model="name"></v-text-field>
                <v-text-field name="blurb" label="Blurb" type="text" v-model="blurb"></v-text-field>
                <v-layout wrap>
                  <v-select class="flex xs2"
                    label="Currency"
                    :items="currencies"
                    v-model="currency"
                  ></v-select>
                  <v-text-field class="flex xs10" name="price" label="Price" type="number" :prefix="prefix" v-model.number="price"></v-text-field>
                </v-layout>
                <v-textarea auto-grow name="description" label="Description" v-model="description"></v-textarea>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn block color="primary" @click="add">Add</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<style scoped lang="scss">
  #backdrop {
    height: 50%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
  }
</style>

<script lang="ts">
import gql from 'graphql-tag';
export default {
  data() {
    return {
      name: '',
      blurb: '',
      description: '',
      price: 0,
      currency: 'HNL',
      currencies: ['USD', 'HNL'],
    };
  },
  computed: {
    prefix() { return this.currency === 'HNL' ? 'L' : '$' },
  },
  methods: {
    add() {},
  },
  // apollo: {
  //   Ingredient: {
  //     query: gql`query {
  //       Ingredient {
  //         id
  //         name
  //       }
  //     }`,
  //   },
  // },
};
</script>
