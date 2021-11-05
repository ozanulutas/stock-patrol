<template>
  <v-autocomplete
    v-model="selectedSymbol"
    :items="symbols"
    :loading="isLoading"
    :search-input.sync="search"
    chips
    clearable
    hide-details
    hide-selected
    item-text="2. name"
    
    return-object
    label="Search for a coin..."
    solo
    @input="selectSymbol"
  >
    <template v-slot:no-data>
      <v-list-item>
        <v-list-item-title>
          Search for your favorite
          <strong>Cryptocurrency</strong>
        </v-list-item-title>
      </v-list-item>
    </template>
    <template v-slot:selection="{ attr, on, item, selected }">
      <v-chip
        v-bind="attr"
        :input-value="selected"
        color="blue-grey"
        class="white--text"
        v-on="on"
      >
        <v-icon left>
          mdi-bitcoin
        </v-icon>
        <span v-text="item['2. name']"></span>
      </v-chip>
    </template>
    <template v-slot:item="{ item }">
      <v-list-item-avatar
        color="indigo"
        class="text-h5 font-weight-light white--text"
      >
        {{ item['2. name'].charAt(0) }}
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title v-text="item['2. name']"></v-list-item-title>
        <v-list-item-subtitle v-text="item['1. symbol']"></v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-action>
        <v-icon>mdi-bitcoin</v-icon>
      </v-list-item-action>
    </template>
  </v-autocomplete>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";

export default {
  name: "SearchForm",
  data() {
    return {
      isLoading: false,
      items: [],
      selectedSymbol: null,
      search: null,
    };
  },
  computed: {
    ...mapState(["symbols"]),
  },
  watch: {
    selectedSymbol(symbol) {
      console.log("symbol", symbol);
    },
    search(company) {
      if (company.length < 3) {
        return;
      }

      this.isLoading = true;
      // searches the symbol by company name
      // and sets the url query by search param
      this.findSymbol(company)
        .then(() => {
          this.$router.push({
            path: "/",
            query: {
              company: company,
            },
          });
        })
        .finally(() => (this.isLoading = false));
    },
  },
  created() {
    const company = this.$route.query.company;

    // if there is company url query, searches symbol by company name on refresh
    if (company) {
      this.findSymbol(company);
    }
  },
  methods: {
    ...mapActions(["findSymbol"]),
    ...mapMutations(["SET_SYMBOL"]),

    selectSymbol() {
      // this.SET_SYMBOL(this.selectedSymbol);
      localStorage.setItem("smp_symbol", JSON.stringify(this.selectedSymbol))

      this.$router.push({
        name: "SymbolPage",
        params: {
          symbol: this.selectedSymbol["1. symbol"],
        },
      });
    },
  },
};
</script>

<style>
</style>