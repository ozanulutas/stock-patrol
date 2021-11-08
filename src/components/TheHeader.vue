<template>
  <v-app-bar
    app
    color="primary"
    dark
  >
    <v-container class="d-flex align-center">
      <router-link
        style="color: white"
        to="/"
      >Home</router-link> |
      <router-link
        style="color: white"
        to="/admin"
      >Admin</router-link>

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
    </v-container>
  </v-app-bar>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "TheHeader",

  data: () => ({
    selectedItem: 0,
    authTypes: [
      false,
      true,
    ]
  }),
  computed: {
    ...mapState(["isLoggedIn"]),
  },
  created() {
    this.selectedItem = this.authTypes.indexOf(this.isLoggedIn);
  },
  methods: {
    ...mapActions(["authenticate"]),
  },
};
</script>
