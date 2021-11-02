<template>
  <div>
    <div v-if="symbols.length > 0" class="d-flex flex-wrap gap-0h">

      <v-tooltip 
        v-for="symbol, i in symbols"
        :key="i"
        bottom
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            
            depressed
            color="primary"
            v-bind="attrs"
            v-on="on"
          >
            {{ symbol["1. symbol"] }}
          </v-btn>
        </template>
        <span>{{ symbol["2. name"] }}</span>
      </v-tooltip>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"

export default {
  name: "SearchResults",
  computed: {
    ...mapState(["symbols"]),
  }
}
</script>

<style>

</style>