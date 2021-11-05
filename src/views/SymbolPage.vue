<template>
  <div>
    <h1>{{ this.symbol["2. name"] }}</h1>
    <!-- <TimeSeriesChart /> -->
  </div>
</template>

<script>
// import TimeSeriesChart from "@/components/TimeSeriesChart"
import { mapActions, mapState } from "vuex";

export default {
  name: "SymbolPage",
  components: {
    // TimeSeriesChart,
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapState(["symbol"]),
  },
  created() {
    const symbol = this.$route.params.symbol
    console.log(symbol);

    if(symbol) {
      this.fetchTimeSeries({
        symbol,
        interval: "DAILY"
      })
    }
  },

  methods: {
    ...mapActions(["fetchTimeSeries"]),
  }
}
</script>

<style>

</style>