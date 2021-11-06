<template>
  <div>
    <h1
      v-if="symbol"
      class="my-5"
    >{{ symbol["2. name"] }}</h1>

    <v-btn-toggle
      dark
      v-model="activeBtn"
    >
      <v-btn
        small
        @click="setSerie('daily')"
      >
        Daily
      </v-btn>
      <v-btn
        small
        @click="setSerie('weekly')"
      >
        Weekly
      </v-btn>
      <v-btn
        small
        @click="setSerie('monthly')"
      >
        Monthly
      </v-btn>
    </v-btn-toggle>

    <TimeSeriesChart
      :draw="drawChart"
      :serie="serie"
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
      activeBtn: 0, // active serie selection btn
      symbol: JSON.parse(localStorage.getItem("smp_symbol")),
    };
  },
  computed: {
    ...mapGetters(["getFormattedTimeSeries"]),
  },

  created() {
    const serie = this.$route.query.serie;
    if(serie) {
      this.serie = serie
    }

    this.fetchSeries();
  },
  beforeDestroy() {
    this.drawChart = false;
  },

  methods: {
    ...mapActions(["fetchTimeSeries"]),

    setSerie(serie) {
      this.drawChart = false;
      this.serie = serie;

      this.fetchSeries();

      this.$router.push({
        path: `/symbol/${this.$route.params.symbol}`,
        query: {
          serie: this.serie
        }
      })
    },

    fetchSeries() {
      this.fetchTimeSeries({
        symbol: this.$route.params.symbol,
        serie: this.serie,
      }).then(() => {
        // console.log(this.timeSeries, "this.timeSeries");
        // console.log(this.getFormattedTimeSeries, "this.timeSeries");
        this.drawChart = true;
      });
    },
  },
};
</script>
