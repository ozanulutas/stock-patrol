<template>
  <v-snackbar v-model="snackbar.state">
    {{ snackbar.text }}

    <template v-slot:action="{ attrs }">
      <v-btn
        color="pink"
        text
        v-bind="attrs"
        @click="snackbar.state = false"
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