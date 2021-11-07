<template>
  <v-card
  >
    <!-- dark
    color="gray lighten-2" -->
   
    <v-card-title class="text-h5"> <!--  red lighten-3 -->
      Search for Company Symbols
    </v-card-title>
    <v-card-text>
      Explore hundreds of stock symbols and view their time series!
    </v-card-text>
    <v-card-text>
      <!-- search form -->
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        @submit.prevent="submit()"
      >
        <v-row align="center">
          <v-col>
            <v-text-field
              v-model="form.company"
              :rules="[v => !!v || 'Tihs field is required']"
              label="Company"
              clearable
              :loading="isLoading"
              prepend-icon="mdi-magnify"
            >
            </v-text-field>
          </v-col>

          <v-col class="flex-0">
            <v-btn
              color="primary"
              :disabled="!valid"
              type="submit"
            >
              SEARCH
            </v-btn>
          </v-col>

        </v-row>

      </v-form>
    </v-card-text>
    <v-divider></v-divider>
    <!-- results expansion -->
    <v-expansion-panels
      v-model="panels"
      flat
      multiple
    >
        
      <v-expansion-panel
        :disabled="symbols.length === 0"
      ><!-- class="red lighten-3" -->
        <v-expansion-panel-header>
          {{ symbols.length > 0 ? "Search Results" : ""}}
        </v-expansion-panel-header>
        <v-expansion-panel-content><!-- class="red lighten-2" -->
          <!-- results -->
          <v-list><!-- class="red lighten-2" -->
            <v-list-item-group>
              <v-list-item
                v-for="(symbol, i) in symbols"
                :key="i"
                link
                @click="selectSymbol(symbol)"
              >
                <v-list-item-avatar
                  color="indigo"
                  class="text-h5 font-weight-light white--text"
                >
                  {{ symbol['1. symbol'].charAt(0) }}
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title v-text="symbol['2. name']"></v-list-item-title>
                  <v-list-item-subtitle v-text="symbol['1. symbol']"></v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "SymbolSearch",
  data() {
    return {
      // form data to submit
      form: {
        company: "",
      },
      valid: true, // form's validity state
      isLoading: false, // is requesting
      panels: [], // expanded search results panel
    };
  },
  computed: {
    ...mapState(["symbols"]),
  },
  mounted() {
    const company = this.$route.query.company;

    // if there is company url query, searches symbol by company name on refresh
    if (company) {
      this.form.company = company;
      this.searchSymbol();
    }

    console.log(this.$route);
  },
  methods: {
    ...mapActions(["findSymbol"]),

    submit() {
      // checks the validity of the form
      if (!this.$refs.form.validate()) {
        return;
      }

      // if form is valid searches the symbol and sets the route query
      this.searchSymbol().then(() => {
        this.$router.push({
          path: "/",
          query: {
            company: this.form.company,
          },
        });

        this.panels = [0]; // expand results panel
      });
    },

    // searches the symbol and sets the loading state form form input
    searchSymbol() {
      this.isLoading = true;

      // finds the symbols bu company name
      return this.findSymbol(this.form.company).finally(
        () => (this.isLoading = false)
      );
    },

    // redirect to chart page and set symbol to localstorage when symbol is selected from list
    selectSymbol(symbol) {
      localStorage.setItem("smp_symbol", JSON.stringify(symbol))

      this.$router.push({
        name: "SymbolPage",
        params: {
          symbol: symbol["1. symbol"],
        },
      });

      this.panels = []; // close results panel
    },
  },
};
</script>

<style>
</style>