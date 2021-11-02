<template>
  <v-app>
    <TheHeader />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import TheHeader from "@/components/TheHeader"

export default {
  name: "App",
  components: {
    TheHeader,
  },
  data: () => ({
  }),
  methods: {
  }
};
</script>
