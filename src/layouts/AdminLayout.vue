<template>
  <v-container>
    <router-view></router-view>
  </v-container>
</template>

<script>
export default {
  name: "AdminLayout",
  mounted() {
    console.log("asd");
    if(!this.$store.state.isLoggedIn) {
      this.$router.push("/");
    }
  }
}
</script>

<style>

</style>