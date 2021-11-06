<template>
  <div>
    <h1 v-if="symbol">{{ symbol["2. name"] }}</h1>

    <v-btn-toggle dark v-model="activeBtn">
      <v-btn
        small
        @click="setSerie('Daily')"
      >
        Daily
      </v-btn>
      <v-btn
        small
        @click="setSerie('Weekly')"
      >
        Weekly
      </v-btn>
      <v-btn
        small
        @click="setSerie('Monthly')"
      >
        Monthly
      </v-btn>
    </v-btn-toggle>

    <TimeSeriesChart 
      :draw="draw" 
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
      draw: false,
      serie: "Daily",
      activeBtn: 0,
      symbol: JSON.parse(localStorage.getItem("smp_symbol")),
    };
  },
  computed: {
    ...mapGetters(["getFormattedTimeSeries"]),
  },
  watch: {
    serie() {
      this.fetchSeries()
    }
  },
  created() {
    this.fetchSeries()
  },

  methods: {
    ...mapActions(["fetchTimeSeries"]),

    setSerie(serie) {
      this.draw = false;
      this.serie = serie;
    },

    fetchSeries() {
      this.fetchTimeSeries({
        symbol: this.$route.params.symbol,
        serie: this.serie.toUpperCase(),
      }).then(() => {
        // console.log(this.timeSeries, "this.timeSeries");
        // console.log(this.getFormattedTimeSeries, "this.timeSeries");
        this.draw = true;
      });
    },
  },
};
</script>
