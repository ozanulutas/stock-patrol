<template>
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
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "SymbolSearchForm",
  data() {
    return {
      // form data to submit
      form: {
        company: "",
      },
      valid: true, // form's validity state
      isLoading: false, // is requesting
    };
  },
  mounted() {
    const company = this.$route.query.company;

    // if there is company url query, searches symbol by company name on refresh
    if (company) {
      this.form.company = company;
      this.searchSymbol();
    }
  },
  methods: {
    ...mapActions(["findSymbol"]),

    submit() {
      // checks the validity of the form
      if (!this.$refs.form.validate()) {
        return;
      }

      // if form is valid searches the symbol and sets the route quesry
      this.searchSymbol().then(() => {
        this.$router.push({
          path: "/",
          query: {
            company: this.form.company,
          },
        });
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

    // selectSymbol() {
    //   // this.SET_SYMBOL(this.selectedSymbol);
    //   localStorage.setItem("smp_symbol", JSON.stringify(this.selectedSymbol))

    //   this.$router.push({
    //     name: "SymbolPage",
    //     params: {
    //       symbol: this.selectedSymbol["1. symbol"],
    //     },
    //   });
    // },
  },
};
</script>

<style>
</style>