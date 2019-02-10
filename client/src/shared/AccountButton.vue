<template>
  <div>
    <v-btn
      color="primary"
      dark
      fixed
      top
      right
      fab
      @click="onClick"
      >
      <v-icon color="white" x-large v-if="user">dashboard</v-icon>
      <v-icon color="white" x-large v-else>account_circle</v-icon>
    </v-btn>
    <v-dialog v-model="loginDialog">
      <v-container> 
        <v-layout align-center justify-center>
          <v-flex xs12 sm9 md8 lg6>
            <v-card class="elevation-1 pa-3">
              <v-card-title>
                <v-layout align-center justify-center>
                  <v-flex xs6>
                    <!-- <img src="/static/m.png" alt="UTILA.coffee" width="120" height="120"> -->
                    <h1 class="flex primary--text">UTILA.coffee</h1>
                  </v-flex>
                </v-layout>
              </v-card-title>
              <v-card-text>
                  <v-form>
                    <v-layout fluid column>
                      <v-flex>
                        <v-text-field name="email" label="Email" append-icon="person" v-model="email" required></v-text-field>
                      </v-flex>
                      <v-flex>
                        <v-text-field name="password" label="Password" type="password"  append-icon="lock" v-model="password" required></v-text-field>
                      </v-flex>
                    </v-layout>
                  </v-form>
              </v-card-text>
              <v-card-actions class="pa-3">
                <v-layout d-flex fluid row wrap align-center justify-space-between>
                  <v-flex d-flex xs8 sm5>
                    <v-layout d-flex fluid row align-center justrify-space-between>
                      <v-flex d-flex>
                        <v-btn icon>
                          <img src="../assets/sprites/facebook.svg" class="social">
                        </v-btn>
                      </v-flex>
                      <v-flex d-flex>
                        <v-btn icon>
                          <img src="../assets/sprites/instagram.svg" class="social">
                        </v-btn>
                      </v-flex>
                      <v-flex d-flex>
                        <v-btn icon>
                          <img src="../assets/sprites/google.svg" class="social">
                        </v-btn>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                  <v-spacer />
                  <v-flex d-flex xs8 sm5>
                    <v-btn color="primary" @click.prevent="register" flat>Register</v-btn>
                    <v-btn color="primary" @click.prevent="login">Login</v-btn>
                  </v-flex>
                </v-layout>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-dialog>
  </div>
</template>

<style scoped lang="scss">
.social {
  width: 24px;
  height: 24px;
  transition: transform .1s;
}

.social:hover {
  transform: scale(1.5, 1.5);
}

</style>

<script lang="ts">
import Vue from 'vue';
import gql from 'graphql-tag';
import { InMemoryCache } from 'apollo-cache-inmemory';

export default Vue.extend({
  props: {
    user: Object,
    loginDialog: Boolean,
  },
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    register() {
      this.$router.push('/auth/register');
      this.loginDialog = false;
    },
    onClick() {
      return void (!!this.user
        ? this.$router.push(`/users/${this.user.id}`)
        : this.loginDialog = true);
    },
    login() {
      this.$apollo.mutate({
        mutation: gql`mutation Login($email: String!, $password: String!) {
          Login(email: $email, password: $password)
        }`,
        variables: { email: this.email, password: this.password },
        async update(cache: InMemoryCache, {data: {Login: token}}: any) {
          return this.$apollo.mutate({
            mutation: gql`mutation setTOKEN($token: String!) {
              setToken(token: $token) @client
            }`,
            variables: { token },
          }).then(async () => {
              await this.$apollo.vm.$apolloProvider.defaultClient.resetStore();
              this.$router.push('/');
              this.loginDialog = false;
          });
        },
      }).catch((err: Error) => {
        console.error(err);
      });
    },

  },
});
</script>