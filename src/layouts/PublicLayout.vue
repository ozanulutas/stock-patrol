<template>
  <v-container>
    <SymbolSearch />
    <router-view></router-view>
  </v-container>
</template>

<script>
import SymbolSearch from "@/components/SymbolSearch"

export default {
  name: "PublicLayout",
  components: {
    SymbolSearch,
  }
}
</script>
