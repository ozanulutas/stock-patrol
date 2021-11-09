<template>
  <div>
    <h1
      v-if="symbol"
      class="mt-8 mb-5"
    >
      {{ symbol["2. name"] }}
      <span class="subtitle-1">
        {{ symbol["1. symbol"] }}
      </span>
    </h1>

    <TimeSeriesChart
      :draw="drawChart"
      :serie="serie"
      :symbol="symbol"
      @set-serie="setSerie"
    />
  </div>
</template>

<script>
import TimeSeriesChart from "@/components/TimeSeriesChart";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "SymbolPage",
  components: {
    TimeSeriesChart,
  },
  data() {
    return {
      drawChart: false,
      serie: "daily", // time serie
      symbol: JSON.parse(localStorage.getItem("sp_symbol")),
    };
  },
  computed: {
    ...mapGetters(["getFormattedTimeSeries"]),
  },
  watch: {
    $route(to, from) {
      // get serie query value from prev route
      const serie = from.query.serie;

      // if there is a serie query and symbol is changed (that means a new symbol search is made)
      // set the url according to new search params
      if (serie && to.params.symbol !== from.params.symbol) {
        this.$router.push({
          path: `/symbol/${this.$route.params.symbol}`,
          query: {
            serie: serie,
          },
        });
      }

      // if here are change in route, fetch new series
      this.fetchSeries();
    },
  },

  created() {
    // when page is created check if there is a serie query in url
    // if there is serie query in url, set local serie state
    const serie = this.$route.query.serie;
    if (serie) {
      this.serie = serie;
    }

    // fetch the series
    this.fetchSeries();
  },

  methods: {
    ...mapActions(["fetchTimeSeries"]),

    // sets the serie state and updates the url accordingly
    setSerie(serie) {
      if (this.serie === serie) {
        return;
      }

      this.serie = serie;

      this.$router.push({
        path: `/symbol/${this.$route.params.symbol}`,
        query: {
          serie: this.serie,
        },
      });
    },

    // fetch series and triggers chart drawing
    fetchSeries() {
      this.drawChart = false;

      this.fetchTimeSeries({
        symbol: this.$route.params.symbol,
        serie: this.serie,
      }).then(() => {
        this.drawChart = true;
      });
    },
  },
};
</script>
