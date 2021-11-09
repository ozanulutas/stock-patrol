<template>
  <v-app-bar
    app
    dark
  >
    <v-container class="d-flex align-center">
      <v-app-bar-title>
        <router-link to="/" class="d-flex align-center gap-0h reset-btn white--text">
          <v-icon>mdi-chart-box</v-icon>
          STOCK PATROL
        </router-link>
      </v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn
        to="/"
      >
        Home
      </v-btn>
      <v-btn
        to="/admin"
      >
        Admin
      </v-btn>

      <!-- menu -->
      <v-menu
        :close-on-content-click="false"
        transition="slide-y-transition"
        bottom
        left
        offset-y
      >
        <template v-slot:activator="{ on: menu, attrs }">
          <v-tooltip bottom>
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
          <v-divider></v-divider>
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
    // selected authentication type from menu
    selectedItem: 0,
    // auth types for setting the selected item
    authTypes: [
      false,
      true,
    ]
  }),
  computed: {
    ...mapState(["isLoggedIn"]),
  },
  watch: {
    // redirects to home page if user is at the /admin path and not logged
    isLoggedIn(isLoggedIn) {
      if(!isLoggedIn && this.$route.path === "/admin") {
        this.$router.push("/");
      } 
    }
  },
  created() {
    // sets the seelcted authentication type
    this.selectedItem = this.authTypes.indexOf(this.isLoggedIn);
  },
  methods: {
    ...mapActions(["authenticate"]),
  },
};
</script>
