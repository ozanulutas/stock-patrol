<template>
  <v-form 
    ref="form"
    v-model="valid"
    lazy-validation
    @submit.prevent="searchSymbols()"
  >
    <v-row align="center">
      <v-col>
        <v-text-field
          v-model="form.company"
          :rules="[v => !!v || 'Tihs field is required']"
          label="company"
          clearable
        ></v-text-field>
        <!-- <v-autocomplete
          v-model="form.company"
          :rules="[v => !!v || 'Tihs field is required']"
          label="company"
          rounded
          solo
          clearable
          hide-details="auto"
          no-data-text="Your search history is empty"
        ></v-autocomplete> -->
      </v-col>

      <v-col class="flex-0">
        <v-btn
          fab
          color="success"
          :disabled="!valid"
          type="submit"
          small
        >
          <v-icon dark>
            mdi-magnify
          </v-icon>
        </v-btn>
      </v-col>

    </v-row>

  </v-form>
</template>

<script>
import { mapActions } from "vuex"

export default {
  name: "SearchForm",
  data() {
    return {
      form: { // form data to submit
        company: "",
      },
      valid: true, // form's validity state
    }
  },
  created() {
    const company = this.$route.query.company

    // if there is company url query, searches symbol by company name on refresh
    if(company) {
      this.form.company = company
      // this.findSymbols(this.form.company) <------- *** daha sonra aç ***
    }
  },
  methods: {
    ...mapActions(["findSymbols"]),

    // searches the company symbol
    // and sets the url query by search param
    searchSymbols() {
      if(this.$refs.form.validate()) { // checks the validity of the form
        console.log("submitted");
        
        // finds the symbols bu company name
        this.findSymbols(this.form.company).then(() => {
          this.$router.push({
            path: "/",
            query: {
              company: this.form.company,
            }
          })
        })

      }
    }
  }
};
</script>

<style>
</style>