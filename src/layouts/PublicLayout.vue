<template>
  <v-container>
    <SearchForm />
    
    <router-view></router-view>
  </v-container>
</template>

<script>
import SearchForm from "@/components/SearchForm"

export default {
  name: "PublicLayout",
  components: {
    SearchForm,
  }
}
</script>

<style>

</style>