<template>
  <v-snackbar v-model="snackbar.show">
    {{ snackbar.text }}

    <template v-slot:action="{ attrs }">
      <v-btn
        :color="snackbar.btn.close.color"
        text
        v-bind="attrs"
        @click="snackbar.show = false"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { mapState } from "vuex"

export default {
  name: 'BaseSnackbar',
  computed: {
    ...mapState(["snackbar"]),
  },
};
</script>

<style>
</style>