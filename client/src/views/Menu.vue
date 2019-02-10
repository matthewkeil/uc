<template>
    <v-layout align-center justify-center>
        <v-flex xs12 sm10 md8>
            <v-card class="ma-3">
                <v-card-title>Appetizers</v-card-title>
                <v-card-text>
                    <v-expansion-panel popout>
                        <v-expansion-panel-content
                            v-for="(item, index) in items"
                            :key="index"
                            >
                            <div slot="header">
                                <v-layout>
                                    <span class="flex xs10">
                                        {{item.name}}
                                    </span>
                                    <span class="flex xs2">
                                        {{item.price}}
                                    </span>
                                </v-layout>
                            </div>
                            <v-card>
                                <v-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-card-text>
                            </v-card>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    data() {
        return {
            items: [{
                name: 'booger',
                price: 1000
            }]
        };
    },
})
</script>

