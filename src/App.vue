<template>
  <v-app>
    <TheHeader />
    <v-main>
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
  data: () => ({

  }),
  methods: {
  }
};
</script>
