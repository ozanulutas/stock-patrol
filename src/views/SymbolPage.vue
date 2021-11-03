<template>
  <div>
    <h1>{{ this.$route.params.symbol }}</h1>
    <TimeSeriesChart />
    <TimeSeriesChart2 />
  </div>
</template>

<script>
import TimeSeriesChart from "@/components/TimeSeriesChart"
import TimeSeriesChart2 from "@/components/TimeSeriesChart2"

export default {
  name: "SymbolPage",
  components: {
    TimeSeriesChart,
    TimeSeriesChart2,
  },

  mounted() {
    console.log(this.$route.params.symbol);
  }
}
</script>

<style>

</style>