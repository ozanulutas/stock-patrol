<template>
  <v-app>

    <v-app-bar app color="primary" dark>
      <router-link style="color: white" to="/">Home</router-link> |
      <router-link style="color: white" to="/about">About</router-link>

      <v-spacer></v-spacer>

      <!-- menu -->
      <v-menu 
        :close-on-content-click="false"
        transition="slide-y-transition"
        bottom 
        left
        offset-y
      >
        <template v-slot:activator="{ on: menu, attrs }">
          <v-tooltip left>
            <template v-slot:activator="{ on: tooltip }">
              <v-btn
                icon
                v-bind="attrs"
                v-on="{ ...tooltip, ...menu }"
              >
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <span>Authentication</span>
          </v-tooltip>
        </template>

        <v-list dense>
          <v-subheader>AUTHENTICATION</v-subheader>
          <v-list-item-group
            v-model="selectedItem"
            color="primary"
          >
            <v-list-item @click="authenticate(false)">
              <v-list-item-icon>
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>User</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item @click="authenticate(true)">
              <v-list-item-icon>
                <v-icon>mdi-account-key</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Admin</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>

    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from "vuex"

export default {
  name: "App",

  data: () => ({
    selectedItem: 0,
  }),
  methods: {
    ...mapActions(["authenticate"]),
  }
};
</script>
