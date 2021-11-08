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
  data() {
    return {
      // data: {
      //   state: false,
      //   text: ""
      // },
    }
  },
  computed: {
    ...mapState(["snackbar"]),
  },
  // watch: {
  //   'snackbar': {
  //     handler(val) {
  //       console.log(val);
  //       this.data = val
  //     },
  //     deep: true,
  //   }
  // }
};
</script>

<style>
</style>