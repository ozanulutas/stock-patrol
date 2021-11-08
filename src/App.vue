<template>
  <v-app>
    <TheHeader />
    <v-main class="grey lighten-5">
      <router-view />
      <BaseSnackbar/>
    </v-main>
  </v-app>
</template>

<script>
import TheHeader from "@/components/TheHeader"
import BaseSnackbar from "@/components/BaseSnackbar"

export default {
  name: "App",
  components: {
    TheHeader,
    BaseSnackbar,
  },
};
</script>
