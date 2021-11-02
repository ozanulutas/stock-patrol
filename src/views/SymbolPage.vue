<template>
  <div>
    <h1>{{ this.$route.params.symbol }}</h1>
  </div>
</template>

<script>
export default {
  name: "SymbolPage",
  mounted() {
    console.log(this.$route.params.symbol);
  }
}
</script>

<style>

</style>