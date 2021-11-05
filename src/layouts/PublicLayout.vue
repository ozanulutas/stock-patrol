<template>
  <v-container>
    <SymbolSearchForm />
    <router-view></router-view>
  </v-container>
</template>

<script>
import SymbolSearchForm from "@/components/SymbolSearchForm"

export default {
  name: "PublicLayout",
  components: {
    SymbolSearchForm,
  }
}
</script>

<style>

</style>