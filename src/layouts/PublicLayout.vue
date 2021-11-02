<template>
  <v-container>
    <SearchForm />
    <SearchResults />
    
    <router-view></router-view>
  </v-container>
</template>

<script>
import SearchForm from "@/components/SearchForm"
import SearchResults from "@/components/SearchResults"

export default {
  name: "PublicLayout",
  components: {
    SearchForm,
    SearchResults
  }
}
</script>

<style>

</style>